let React = require('react');


var Store = {
  questions: [{
	  question: "Which Word Best Describes You?",
	  choices: ["Daring", "Warm", "Opinionated", "Artistic", "Quiet", "Impulsive"],
	},{
	  question: "Which sounds the most fun right now?",
	  choices: ["Sky Diving","Hanging out with Friends","Dancing","Arts Festival", "Reading", "Shopping"],
  },{
	  question: "Which face best describes you?",
	  choices: ["Laughing","Wink","Thrilled/Surprised","Asleep","Mischievious", "Determined"],
  },{
    question: "Which movie would you most like to watch?",
    choices: ["Breakfast Club","Mission Impossible","27 Dresses","The Notebook", "Ocean's 11", "Zoro"],
  },{
    question: "Which animal would make the best pet?",
    choices: ["Tarantula","Puppy","Koala","Capuchin Monkey", "Chameleon", "Falcon"],
  },{
    question: "What's the first thing you'd do at an amusement park?",
    choices: ["Carousel","Ferris Wheel","Fun House","Log Flume", "Midway Games", "Rollercoaster"],
  },{
    question: "What are you most likely doing at a party?",
    choices: ["Karaoke","Mingling","Eating","Watching", "Looking at the door", "Being the center of attention"],
  },{
    question: "What type of season are you?",
    choices: ["Bring on the snow","Sun Sun Sun","Flowers Blooming","Thunder Storms", "Changing Leaves", "Dry Heat"],
  }],
  flavors: ['Green Apple', 'Mango', 'Banana', 'Strawberry', 'Grape', 'Cherry'],
  currentQuestionIndex: 0,
  selections: {},

  reset: function() {
    this.currentQuestionIndex = 0;
    this.selections = {};
    this.onChange();
  },
  getCurrentQuestion: function() {
    return this.questions[this.currentQuestionIndex];
  },
  goPrevQuestion: function() {
    if(this.currentQuestionIndex - 1 >= 0) {
      this.currentQuestionIndex -= 1;
    }
    this.onChange();
  },
  goNextQuestion: function() {
    this.currentQuestionIndex += 1;
    this.onChange();
  },
  selectChoice: function(questionIndex, choiceIndex) {
    this.selections[questionIndex] = choiceIndex;
    this.onChange();
  },
  getSelection: function(questionIndex) {
    return this.selections[questionIndex];
  },
  getTopFlavor: function() {
    let selections = this.selections;
    let selectionCounts = Object.keys(selections)
      .map(function(key) { return selections[key] }) // get all the choices
      .reduce(function(p, n) { p[n] = (p[n] + 1) || 1; return p; }, {}); // object with count for all the choices;
    let top = Object.keys(selectionCounts) // get index of most common selection
      .reduce(function(p, n) { return selectionCounts[p] > selectionCounts[n] ? p : n })

    return this.flavors[top];
  },
  getQuestionCount: function() {
    return this.questions.length;
  },
  getCurrentSelection: function() {
    return this.getSelection(this.currentQuestionIndex);
  },
  onChange: function() {
    // stub to be set later
  }
}


var Choice = React.createClass({
  selectChoice: function() {
    Store.selectChoice(this.props.qIndex, this.props.index);
  },
  render: function() {
    var className = this.props.selected ? 'choice selected' : 'choice';

    return(
      <a className={ className } onClick={this.selectChoice}>
        { this.props.value }
      </a>
    );
  }
});

var Question = React.createClass({
  prev: function() {
    Store.goPrevQuestion();
  },
  next: function() {
    Store.goNextQuestion();
  },
  render: function() {
    var question = Store.getCurrentQuestion();
    var qIndex = Store.currentQuestionIndex;
    var selection = Store.getCurrentSelection();;
    var choices = question.choices.map(function(value, index) {
      return(
        <Choice key={qIndex + '-' + index} qIndex={qIndex} value={value} index={index} selected={selection === index} />
      );
    });
    return(
      <div id="question">
        <h2>{ question.question }</h2>
        { choices }
        <button onClick={this.prev}>Previous</button>
        <button onClick={this.next}>Next</button>
      </div>
    );
  }
});

var Result = React.createClass({
  reset: function() {
    Store.reset();
  },
  render: function() {
    return(
      <div id="result">
        You are a { Store.getTopFlavor() }!
        <br />
        <button onClick={ this.reset }>Start Over</button>
      </div>
    );
  }
});

var Quiz = React.createClass({
  componentDidMount: function() {
    Store.onChange = this.onChange; // forceUpdate
  },
  onChange: function() {
    this.forceUpdate();
  },
  render: function() {
    return(
      <div id="quiz">
        {(() => {
          if(Store.currentQuestionIndex >= Store.getQuestionCount()) {
            return <Result />
          } else {
            return <Question />
          }
        })()}
      </div>
    );
  }
});

module.exports = Quiz;
