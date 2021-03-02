const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["+", "-", "/", "*"];
const ids ={
  7:"seven",
  8:"eight",
  9:"nine", 
  4:"four",
  5:"five",
  6:"six",
  1:"one",
  2:"two",
  3:"three",
  0:"zero",
  "+":"add",
  "-":"subtract",
  "/":"divide",
  "*":"multiply"
};


class App extends React.Component{
  state={
    pressed:undefined,
    calculate:"0",
  }
  
  handleClick = (e)=>{
    const { calculate, pressed } = this.state;
    const { innerText } = e.target;
    
    switch(innerText){
      case "A/C":{
        this.setState({
          calculate:"0",
          pressed:undefined
        });
        break;
      }
        
      case"=":{
        const evals = eval(calculate);
        this.setState({
          calculate:evals
        });
        break;
      }
        
      case ".":{
        const arr = calculate.split(/[\+\-\*\/]/);
        const end = arr.slice(-1)[0];
        
        if(!end.includes(".")){
          this.setState({
            calculate: calculate + "."
          })
        }
        break;
      }
        
      default:{
        let check0= undefined;
        
        if(ops.includes(innerText)){
          if(ops.includes(pressed) && innerText !== "-"){
            
            const endNum = calculate
            .split('')
            .reverse()
            .findIndex(char=> char !== " " && nums.includes(+char));
            
            check0 = calculate.slice(0, calculate.length - endNum) + ` ${innerText} `;
          }else{
            check0 = `${calculate} ${innerText} `;
          }
          
        }else{
          check0 = calculate ==="0" ? innerText : (calculate+innerText);
        };
        
        this.setState({
            calculate:check0,
        });
        
      }
    };
    
    this.setState({
      pressed:innerText
    });
   
    console.log(calculate);
  
  };
  
  render(){
    const { calculate } = this.state;
    return(
      <div className="Calculator">
        <div id="display" className="display">{calculate}</div>
    
        <div className="numbers">
          <button className="AC " onClick={this.handleClick} id="clear">A/C</button>
      
          {nums.map((num)=>(
            <button 
              key={num}
              className={`${num === 0 && 'horiz'}`}
              onClick={this.handleClick}
              id={ids[num]}
              >{num}
            </button>
          ))}
      
          <button onClick={this.handleClick} id="decimal">.</button> 
          
        </div>
    
        < div className="operators">
          {ops.map((op)=>(
            <button 
              key={op} 
              onClick={this.handleClick}
              id={ids[op]}
              >{op}
            </button>
          ))}
          
          <button id="equals" onClick={this.handleClick}> = </button>
        </div>
    
  </div>
    );
  };
};
ReactDOM.render(<App />,document.getElementById("App"));
