import React, { Component} from 'react';
import './App.css';

//have a global var for outline

class Information extends Component {
  // constructor(props) {
  //   super(props);
  //   //const [wordCount, setCount] = useState(0);
  // }
  render() {
    return(
    <div id="info">
      <h2>Starshine</h2>
      <p>A space for distraction free writing.</p>
      <p>wc: </p>
    </div>
    )
  }
}

class Settings extends Component {
  constructor(props) {
    super(props);
    this.animateBars = this.animateBars.bind(this);
  }
  
  animateBars() {
    let settings = document.querySelector("#settings");
    settings.classList.toggle("change")
  }
  render() {
    return(
    <div id="settings" onClick={this.animateBars}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
    )
  }
}
class Chapter extends Component {

  componentDidMount() {
    this.content.addEventListener("input", this.debounced);
    console.log("hmmm")
  }

  componentWillUnmount() {
    this.content.removeEventListener("input", this.debounced);
  }

  // borrowed from 'cent' on Codepen: https://codepen.io/centurianii/pen/QJgPMv?editors=0010
  debounced = (e) => {
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  render() {
    return (
      <div id="main-content">
        <form>
          <input className="chapter" type="text"
            placeholder={this.props.chptrNum}>
          </input>
        </form>
        <textarea ref={elem => this.content = elem} id="source-html" class="content" rows='4' data-min-rows='4' >Your beautiful words here.</textarea>
      </div>
    );
  }
}
class MainContent extends Component {

  render() {
    return (
      <div id="main-content">
        <form>
            <input className="title" type="text"
                  placeholder="Your title here">
            </input>
        </form>
        <Chapter chptrNum='Chapter 1' />
        <div >
          <button> + </button>
        </div>
        <button onClick={exportHTML}> Export to Word</button>
      </div>
    );
  }
}

function exportHTML() {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'>"+
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

    let footer = "</body></html>";
    let title = this.state.title;
    let sourceHTML = header+title+document.getElementById("source-html").innerHTML+footer;
    //get rid of delete × from word doc
    sourceHTML = sourceHTML.replace(/×/g, '');
    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = title + '.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
    console.log("exported successfully!")
}
let autoExpand = document.querySelectorAll('scope textarea.content');

function debounced(e) {
  e.target.style.height = e.target.scrollHeight + 'px';
}

autoExpand.forEach(function(el){
  el.addEventListener('input', debounced);
});

// const App = (props) => {
//   const autoExpand = (event) =>{
//     console.log("adding event");

//   }

//   return (
//     <div className="flex-container">
//         <Information />
//         <MainContent />
//         <Settings />
//     </div>
//   );
// }

function App() {

  return (
    <div className="flex-container">
        <Information />
        <MainContent />
        <Settings />
    </div>
  );
}

export default App;
