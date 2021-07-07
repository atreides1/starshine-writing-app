import './App.css';
import React, { useEffect, useState } from "react";
// import ContentEditable from 'react-contenteditable';
// import React, { Component } from 'react';
// import ContentEditable from 'react-contenteditable';
// import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Chapter, Story } from './Sections';

// // props - uuid, chapterTile, chapterContent
// class Chapter extends Component {
//   constructor(props) {
//     super(props);
//     this.titleEditable = React.createRef();
//     this.contentEditable = React.createRef();
//     this.state = {
//       uuid: this.props.uuid,
//       title: this.props.chapterTitle,
//       html: this.props.chapterContent,
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     let titleChanged = prevState.title !== this.state.title;
//     if (prevState.html !== this.state.html || titleChanged) {
//       this.props.updateChapter(this.state.uuid, this.state.title, this.state.html);
//     }
//   }

//   handleTitleChange = (e) => {
//     this.setState({ title: e.target.value });
//   }

//   handleContentChange = (e) => {
//     this.setState({ html: e.target.value });
//   }

//   render() {
//     return (
//       <div>
//         {/* Chapter Title */}
//         <ContentEditable
//           innerRef={this.titleEditable}
//           html = {this.state.title}
//           disabled={false}
//           onChange={this.handleTitleChange}
//         />
//         {/* Chapter Content */}
//         <ContentEditable
//           innerRef={this.contentEditable}
//           html = {this.state.html}
//           disabled={false}
//           onChange={this.handleContentChange}
//         />
//       </div>
//     )
//   }
// }

// class Project extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: this.props.user,
//       uuid: this.props.uuid,
//       title: "<h2>Project Title Here</h2>",
//       chapters: [],
//     };
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.user !== this.props.user) {
//       this.setState({ user: this.props.user })
//     }
//   }

//   handleUpdate = (uuid, chapterTitle, chapterContent) => {
//     console.log("An update occured");
//     console.log(chapterTitle, chapterContent);
//     // save to chapters in state
//     let idx = this.state.chapters.find(x => x.uuid === uuid);
//     console.log(idx);
//     // save to db
//     // let project = {
//     //   user: this.state.user,
//     //   uuid: uuid,
//     //   title: this.state.title,
//     //   chapters: this.state.chapters,
//     // };

//     // axios
//     //   .post(process.env.REACT_APP_WEBSOCKET_SERVER + "/update", project)
//     //   .then(() => console.log("Story saved to database"))
//     //   .catch((err) => {
//     //     console.error(err);
//     //   });
//   };

//   handleTitleChange = (e) => {
//     this.setState({ title: e.target.value });
//   };

//   addChapter = () => {
//     let uuid = uuidv4();
//     // create new chapter obj
//     let newChapter = {
//       uuid: uuid,
//       chapterTitle: "<h3>Chapter __</h3>",
//       chapterContent: "<p>Your beautiful words here.</p>",
//     };
//     // add to state
//     this.setState(
//       (prevState) => {
//         return {
//           chapters: [...prevState.chapters, newChapter],
//         };
//       }, () => {
//         console.log(this.state.chapters.length);
//       }
//     );
//   };

// docTitle, elementID
//   exportHTML = () => {
//     let header =
//       "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
//       "xmlns:w='urn:schemas-microsoft-com:office:word' " +
//       "xmlns='http://www.w3.org/TR/REC-html40'>" +
//       "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

//     let footer = "</body></html>";
//     let title = this.state.title;
//     let sourceHTML =
//       header +
//       title +
//       document.getElementById("source-html").innerHTML +
//       footer;
//     let source =
//       "data:application/vnd.ms-word;charset=utf-8," +
//       encodeURIComponent(sourceHTML);
//     let fileDownload = document.createElement("a");
//     document.body.appendChild(fileDownload);
//     fileDownload.href = source;
//     fileDownload.download = title + ".doc";
//     fileDownload.click();
//     document.body.removeChild(fileDownload);
//     console.log("exported successfully!");
//   };

//   handleSave = (e) => {
//     if (!this.state.uuid) {
//       this.setState({ uuid: uuidv4() })
//     }

//     if (this.state.user === null) {
//       return alert("Please log in to save your project.");
//     }
//     // let uuid = this.state.uuid ? this.state.uuid : uuidv4();

//     let project = {
//       user: this.state.user,
//       uuid: this.state.uuid,
//       title: this.state.title,
//       chapters: this.state.chapters,
//     };

//     axios
//       .post(process.env.REACT_APP_WEBSOCKET_SERVER + "/save", project)
//       .then(() => console.log("Story saved to database"))
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   render() {
//     let defaultChapter = (
//       <Chapter
//         uuid={uuidv4()} //create uuid
//         chapterTitle={"<h3>Chapter __</h3>"}
//         chapterContent={"<p>Your beautiful words here.</p>"}
//         updateChapter={this.handleUpdate}
//       />
//     );

//     let chapters = this.state.chapters.map((chapter) => (
//       <Chapter
//         uuid={chapter.uuid}
//         chapterTitle={chapter.chapterTitle}
//         chapterContent={chapter.chapterContent}
//         updateChapter={this.handleUpdate}
//         key={chapter.uuid}
//       />
//     ));

//     return (
//       <div>
//         <div>
//           <ContentEditable
//             html={this.state.title}
//             disabled={false}
//             onChange={this.handleTitleChange}
//           />
//         </div>
//         <div id="source-html">
//           {this.state.chapters.length === 0 ? defaultChapter : chapters}
//         </div>
//         <div>
//           <button onClick={this.addChapter}> + </button>
//           <button onClick={this.exportHTML}> Export to Word </button>
//           <button onClick={this.handleSave}> Save </button>
//         </div>
//       </div>
//     );
//   }
// }
function Logo() {
  return (
    <div id="logo">
      <h4>Starshine</h4>
      <h5 style={{"color" : "#b3b3b3"}}>Distraction-free Writing</h5>
    </div>
  )
}

function LoginForm(props) {
  const [formValue, setFormValue] = useState("");

  return (
    <div id="login-form">
    <form onSubmit={(e) => { 
      props.onLogin(formValue); 
      e.preventDefault();
      } }>
      <label>
        User:
        <input type="text" value={props.user} onChange={(e) => setFormValue(e.target.value)}/>
      </label>
      <input type="submit" value="Login" />
    </form>
    </div>
  )
}

function Login(props) {
  const welcomeMessage = <h5>Welcome, {props.user}</h5>;
  return (
    <div id="login-section">
      {(props.user) ? welcomeMessage : <LoginForm onLogin={props.onLogin}/> }
    </div>
  )
}

function ChapterTab(props) {
  return (
      <li style={(props.isSelected)?{"border":"solid"}:{"color":"#b3b3b3"}}
          onClick={(e) => {
            props.setCurrentSection(props.chapter.uuid);
          }}>
        {props.chapter.chapterTitle}
      </li>
  )
}

function StoryTab(props) {
  let chapterTabs = props.story.chapters.map((chapter) => (
    <ChapterTab
      chapter={chapter}
      currentSection={props.currentSection}
      setCurrentSection={props.setCurrentSection}
      isSelected={chapter.uuid === props.currentSection}
      key={chapter.uuid}
    />
  ));
  let isSelected = props.story.uuid === props.currentSection;
  return (
    <div>
      <ul>
        <li
          style={isSelected ? { border: "solid" } : {}}
          onClick={() => {
            props.setCurrentSection(props.story.uuid);
          }}
        >
          {props.story.title}
        </li>
         <ul>
          {chapterTabs}
          <button onClick={() => props.addNewChapter(props.story.uuid)}> + </button>
        </ul>
      </ul>
    </div>
  );
}



function LeftSidebar(props) {
  //props.stories
  let storyTabs = props.stories.map((story) => (
    <StoryTab story={story}
              currentSection={props.currentSection}
              setCurrentSection={props.setCurrentSection}
              addNewChapter={props.addNewChapter}
              key={story.uuid}/>
    )
  );
  return (
    <div id="left-sidebar">
      {storyTabs}
      <button onClick={props.addNewStory}> + </button>
    </div>
  )
}

// function Chapter(props) {
//   const title = useRef(props.chapterTitle);
//   const content = useRef(props.chapterContent);
//   const handleTitleChange = (e) => {
//     title.current = e.target.value;
//     let updatedChapter= { chapterTitle: title.current };
//     props.update(props.uuid, updatedChapter);
//   };
//   const handleContentChange = (e) => {
//     content.current = e.target.value;
//     let updatedChapter = { chapterContent: content.current };
//     props.update(props.uuid, updatedChapter);
//   };

//   return (
//     <div className="chapter">
//       {/* Chapter Title */}
//         <ContentEditable
//           // innerRef={this.titleEditable}
//           html = {"<h3>" + title.current + "</h3>"}
//           disabled={false}
//           onChange={handleTitleChange}
//         />
//          {/* Chapter Content */}
//         <ContentEditable
//           // innerRef={this.contentEditable}
//           html = {content.current}
//           disabled={false}
//           onChange={handleContentChange}
//         />
//     </div>
//   )
// }

// function Story(props) {
//   const title = useRef(props.title);
//   const handleTitleChange = (e) => {
//     title.current = e.target.value;
//     let updatedStory = {title: title.current}
//     props.update(props.uuid, updatedStory);
//   };
//   let chapters = props.chapters.map((chapter) => (
//       <Chapter
//         uuid={chapter.uuid}
//         chapterTitle={chapter.chapterTitle}
//         chapterContent={chapter.chapterContent}
//         // updateChapter={this.handleUpdate}
//         key={chapter.uuid}
//         update={props.update}
//       />
//     ));

//     return (
//       <div className="story-section">
//         <div className="story-content">
//           {/* Chapter Title */}
//           <ContentEditable
//             html={"<h2>"+ title.current + "</h2>"}
//             disabled={false}
//             onChange={handleTitleChange}
//           />
//           <br />
//         </div>
//         <div className="story-chapters">
//           {chapters}
//           {/* {this.state.chapters.length === 0 ? defaultChapter : chapters} */}
//         </div>
//         <div>
//           {/* <button onClick={this.addChapter}> + </button> */}
//           {/* <button onClick={exportHTML(title.current, title.current+"_contents")}> Export to Word </button> */}
//           {/* <button onClick={this.handleSave}> Save </button> */}
//         </div>
//       </div>
//     )
  
// }

// docTitle, elementID
  // const exportHTML = (docTitle, elementId) => {
  //   let header =
  //     "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
  //     "xmlns:w='urn:schemas-microsoft-com:office:word' " +
  //     "xmlns='http://www.w3.org/TR/REC-html40'>" +
  //     "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

  //   let footer = "</body></html>";
  //   let title = docTitle;
  //   let sourceHTML =
  //     header +
  //     title +
  //     document.getElementById(elementId).innerHTML +
  //     footer;
  //   let source =
  //     "data:application/vnd.ms-word;charset=utf-8," +
  //     encodeURIComponent(sourceHTML);
  //   let fileDownload = document.createElement("a");
  //   document.body.appendChild(fileDownload);
  //   fileDownload.href = source;
  //   fileDownload.download = title + ".doc";
  //   fileDownload.click();
  //   document.body.removeChild(fileDownload);
  //   console.log("exported successfully!");
  // };

function MainContent(props) {
  let displayedSection;
  let story = props.stories.find(story => story.uuid === props.currentSection);
  let chapter = props.stories.flatMap(story => story.chapters).find(c => c.uuid === props.currentSection);
  // Case 1: Story is selected
  if (story) {
    displayedSection = <Story 
                          title={story.title} 
                          uuid={story.uuid} 
                          chapters={story.chapters} 
                          update={props.updateSection}
    />

  // Case 2: Chapter is selected
  } else if (chapter) {
    // console.log(chapter);
    // console.log(chapter.uuid);
    // console.log(chapter.chapterTitle);
    displayedSection = <Chapter 
                          uuid={chapter.uuid} 
                          chapterTitle={chapter.chapterTitle} 
                          chapterContent={chapter.chapterContent} 
                          key={chapter.uuid}
                          update={props.updateSection}
    />

  // Case 3: Nothing is selected
  } else {
    displayedSection = <p>Try creating or selecting a story!</p>
  }
  return <div id="main-content">
    {displayedSection}
  </div>;
}

function App() {
  const [user, setUser]       = useState(null);
  const [stories, setStories] = useState([
    {
      user: "testUser",
      uuid: "testUUIDdfsdf",
      title: "testTitle",
      chapters: [
        { chapterTitle: "chapter 1", uuid: "testUUIDcv", chapterContent: "Hello world!" },
        { chapterTitle: "chapter 2", uuid: "testUUID12312", chapterContent: "Goodbye" },
      ],
    },
    {
      user: "testUser2",
      uuid: "testUUID2",
      title: "testTitle2",
      chapters: [{ chapterTitle: "chapter 1", uuid: "testUUID3", chapterContent: "It's a new dawn" }],
    },
  ]);
  const [currentSectionUUID, setCurrentSection] = useState(null);
  
  // load in data on login
  useEffect(() => {
    //if user if not null, check localStorage/db to see if data exists
    let data = localStorage.getItem("savedSessions");
    data = JSON.parse(data);
    console.log(data);
    if (data !== null) {
      // find user
      data = data.find(session => session.user === user);
      if (data !== undefined) {
        console.log("looky, the user is there")
        setStories(data.stories);
        setCurrentSection(data.uuid);
      }
    }
  }, [user]);

  const createChapter = () => {
    return {
      uuid: uuidv4(),
      chapterTitle: "Chapter __",
      chapterContent: "Your beautiful words here.",
    }
  };

  const addNewStory = () => {
    let newStory = {
      user: user,
      uuid: uuidv4(),
      title: "Enter Title Here",
      chapters: [ createChapter() ],
    };
    setStories([...stories, newStory]);
    setCurrentSection(newStory.uuid);
  }

  const addNewChapter = (storyUUID) => {
    let newChapter = createChapter();
    // let modifiedStory = stories.find(story => story.uuid === storyUUID);
    let modIdx  = stories.findIndex(story => story.uuid === storyUUID);
    // let modIdx = 0;
    let newChapters = [ ...stories[modIdx].chapters, newChapter ];
    // modifiedStory.chapters = [ ...modifiedStory.chapters, newChapter ];
    setStories((prevState) => {
      prevState[modIdx].chapters = newChapters;
      return([
        ...prevState,
        
      ])
    })
    setCurrentSection(newChapter.uuid);
    // setStories([...stories, modifiedStory]); // might be wrong
  }

  const updateSection = (sectionUUID, updatedSection) => {
    let storyIdx = stories.findIndex(story => story.uuid === sectionUUID);
    if (storyIdx !== -1) {
      let updatedStory = {...stories[storyIdx], ...updatedSection}
      setStories((prevState) => {
        prevState[storyIdx] = updatedStory;
        return([ ...prevState ]);
      });

    } else {
      storyIdx = stories.findIndex(story => story.chapters.find(c => c.uuid === sectionUUID));
      let chapterIdx = stories[storyIdx].chapters.findIndex(chapter => chapter.uuid === sectionUUID);
      let updatedChapter = {...stories[storyIdx].chapters[chapterIdx], ...updatedSection}
      setStories((prevState) => {
        prevState[storyIdx].chapters[chapterIdx] = updatedChapter;
        return([ ...prevState ])
      });
    }
  }

  const save = () => {
    let currentSession = {
      user: user,
      stories: stories,
      uuid: currentSectionUUID,
    };
    // check localStorage in case we already have data
    let savedSessions = localStorage.getItem("savedSessions");
    savedSessions = JSON.parse(savedSessions);
    if (savedSessions !== null) {
      // check if user already has data
      let curr_user = savedSessions.find(session => session.user === user);
      if (curr_user !== undefined) {
        curr_user.stories = stories;
        curr_user.uuid = currentSectionUUID;
        // console.log(curr_user);
        // console.log(savedSessions);
      } else {
        savedSessions = [ ...savedSessions, currentSession ];
      }
    } else {
      savedSessions = [ currentSession ];
    }
    localStorage.setItem('savedSessions', JSON.stringify(savedSessions));
  }
  return (
    <div className="App">
      <div id="header">
        <Logo />
        <Login user={user} onLogin={setUser} />
      </div>
      {/* flex, around 30% */}
      {/* <div id="main"> */}
      <LeftSidebar
        stories={stories}
        currentSection={currentSectionUUID}
        setCurrentSection={setCurrentSection}
        addNewStory={addNewStory}
        addNewChapter={addNewChapter}
      />
      <MainContent
        stories={stories}
        currentSection={currentSectionUUID}
        updateSection={updateSection}
        // story={currentStoryUUID}
        // chapter={currentChaptUUID}
      />
      <button onClick={save}>Save</button>
      {/* </div> */}
    </div>
  );
}
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//       formValue: "",
//     };
//   }

//   // componentDidMount() {
//   //   fetch("/api")
//   //     .then((res) => res.json())
//   //     .then((data) => this.setState({user: data.message}));
//   // }
//   handleChange = (e) => {
//     this.setState({ formValue: e.target.value });
//   }

//   handleLogIn = (e) => {
//     // if (e.target.value !== "") {
//     let userID = this.state.formValue; //e.target.value.toLowerCase();
//     this.setState({ user: userID }, () => {console.log(this.state.user)});
//     // e.target.value = "";
//     e.preventDefault();
//   }

//   render() {
//     return (
//       <div>
//         <h1>Starshine: A distraction-free story editor</h1>
//         {/* <Header /> */}
//         {!this.state.user && <div>
//             <form onSubmit={this.handleLogIn}>        
//               <label>
//                 User:
//                 <input type="text" value={this.state.formValue} onChange={this.handleChange}/>        
//               </label>
//               <input type="submit" value="Login" />
//             </form>
//           {/* {!this.state.user && <button onClick={this.handleLogIn}> Login </button>} */}
//         </div>
//         }
//         {this.state.user && <p>Welcome, {this.state.user}</p>}
//         <Project user={this.state.user} uuid={uuidv4()}/>
//       </div>
//     );
//   }
// }
export default App;
