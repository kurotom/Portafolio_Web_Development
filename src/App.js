import React from 'react';
import ReactDOM from 'react-dom/client';
import { pads } from './App.css';

const nums = [
  {
    id: 'seven',
    item: 7
  },
  {
    id: 'eight',
    item: 8
  },
  {
    id: 'nine',
    item: 9
  },
  {
    id: 'four',
    item: 4
  },
  {
    id: 'five',
    item: 5
  },
  {
    id: 'six',
    item: 6
  },
  {
    id: 'one',
    item: 1
  },
  {
    id: 'two',
    item: 2
  },
  {
    id: 'three',
    item: 3
  },
  {
    id: 'zero',
    item: 0
  },
  {
    id: 'add',
    item: '+'
  },
  {
    id: 'subtract',
    item: '-'
  },
  {
    id: 'multiply',
    item: '*'
  },
  {
    id: 'divide',
    item: '/'
  },
  {
    id: 'decimal',
    item: '.'
  },
  {
    id: 'clear',
    item: 'C'
  },
  {
    id: 'equals',
    item: '='
  }
];

class Display extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.isPower)
  }
  render() {
    return (
      <div id='result'>
        <div id='temp'>
          <span>0</span>
        </div>
        <div id='display'>
        0
        </div>
      </div>
    )
  }
}

let zeroActive = false;
let multipleDots = false;
let newCalculation = false;
let dotsCounts = [];



class PadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      formula: ''
    };
    // bind methods
    this.clic = this.clic.bind(this);
  }
  // methods

  clic(evento) {
    const display = document.getElementById('display');
    const clicItem = evento.target.childNodes[0].data;
    const preview = document.getElementById('temp').querySelector('span');
    let initZero = [0];
    let preDot = true;

    // console.log(clicItem, preview.innerText);


    if ( clicItem === 'C' ) {
      preview.innerText = 0;
      display.innerText = 0;
      zeroActive = false;
      newCalculation = false;
      multipleDots = false;
    }
    else if ( clicItem === '=') {
      console.log('equals operator')
      console.log(preview.innerText)
      const checkOperators = (formula) => {
        const reverse = (item) => {
          let i = 0;
          let h = [];
          let maxOneOperator = false;
          for (i=item.length - 1; i > -1; i-- ) {
            if (maxOneOperator) {
              if (!['+','-','*','/'].includes(item[i])) {
                h.push(item[i])
              }
            } else {
              if (['+','-','*','/'].includes(item[i])) {
                maxOneOperator = true;
              }
              h.push(item[i])
            }
          }
          return h.join('');
        }
        // console.log(formula)
        let a = [];
        // let i = formula.length
        let f = reverse(formula);
        let x = 0;
        for ( x=f.length; x > -1; x-- ) {
          a.push(f[x])
        }
        // consecutiveOperators = true;
        return a.join('')
      }


      let consecutiveOperators = false;
      console.log('----------------')
      console.log('operadores consecutivos', consecutiveOperators)

      let t = 0;
      let ax = 0;
      for (t = 0; t < preview.innerText.length; t++ ) {
        if (!'-'.includes(preview.innerText[t])) {
          if (['+','*','/'].includes(preview.innerText[t])) {
            ax++;
          }
        }
        //  else {
        //   ax--;
        // }
      }
      if (ax > 1 && ax < 3) {
        consecutiveOperators = true;
      } else {
        consecutiveOperators = false;
      }

      console.log(ax, consecutiveOperators, checkOperators(preview.innerText))

      if (consecutiveOperators) {
        console.log(']]]]]   OTRO')
        display.innerText = eval(checkOperators(preview.innerText));
        newCalculation = true;
      } else {
        console.log('---- ESTE')
        display.innerText = eval(preview.innerText);
        newCalculation = true;
      }


    }
    else {
//////////////////////////////////////////////
//////////    ACA HAY DRAMAS   ///////////////
//////////////////////////////////////////////

      if (clicItem === '.') {
        if (!multipleDots) {
          preview.innerText += clicItem;
          display.innerText += clicItem;
        }
      }
      else {
        if (newCalculation) {
//
//
          if (
                '+'.includes(clicItem) ||
                '-'.includes(clicItem) ||
                '*'.includes(clicItem) ||
                '/'.includes(clicItem)
          ) {
            console.log(clicItem)
            preview.innerText = display.innerText;
            display.innerText = '0';
            newCalculation = false;
            multipleDots = false;
//
//
          } else {
            preview.innerText = '0';
            display.innerText = '0';
            newCalculation = false;
            multipleDots = false;
          }
        }

        if (
          preview.innerText.includes('+') ||
          preview.innerText.includes('-') ||
          preview.innerText.includes('*') ||
          preview.innerText.includes('/')
        ) {
          multipleDots = false;
        }
        //   REGEX
        //  r = /^[0-9]+\.{1}[0-9]+$/i;
        //  r.test(variable)
        //
        preview.innerText += clicItem;
        display.innerText += clicItem;

      }

      if (!preview.innerText.includes('.')) {
        console.log('---->', preview.innerText, clicItem)
        if (preview.innerText[0] === '0') {
          preview.innerText = preview.innerText.slice(1,preview.innerText.length);
          display.innerText = preview.innerText.slice(0,preview.innerText.length);
        }
      } else {
        //    preview.innerText SI INCLUYE punto
        console.log('####>', `Active multipleDots?:  ${multipleDots}`,preview.innerText, clicItem)
        console.log(dotsCounts, dotsCounts.length, dotsCounts.length * 2);
        if (
          preview.innerText.includes('+') ||
          preview.innerText.includes('-') ||
          preview.innerText.includes('*') ||
          preview.innerText.includes('/')
        ) {
          if (dotsCounts.length * 2 > dotsCounts.length) {
            multipleDots = true;
          } else {
            multipleDots = false;
          }
        } else {
          multipleDots = true;
        }
        // if (
        //   preview.innerText.includes('+') ||
        //   preview.innerText.includes('-') ||
        //   preview.innerText.includes('*') ||
        //   preview.innerText.includes('/')
        // ) {
        //   multipleDots = false;
        // }
        // else {
        //     multipleDots = true;
        // }
      }
/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////
    }
  }

  render() {
    return (
      <div id={this.props.id} onClick={this.clic}>
          {this.props.item}
      </div>
    );
  }
}



class ButtonsPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s: ''
    }
    console.log(this.props.isPower);

  }

  render() {
    let arrayNums = []
    arrayNums = nums.map((algo, i, arr) => {
      return (
        <PadButton
          id={arr[i].id}
          item={arr[i].item}
        />
      );
    })
    return (
      <div id='pads'>
        { arrayNums }
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true
    }
    // bind methods
  }
  // methods


  render() {
    return (
      <div id='calculator' className='container'>
        <Display
          isPower={this.state.power}
        />
        <div>
          <ButtonsPad
            isPower={this.state.power}
          />
        </div>
      </div>

    )
  }
};


export default App;
