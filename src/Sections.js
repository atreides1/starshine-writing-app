import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
// import React, { Component } from 'react';
// import ContentEditable from 'react-contenteditable';
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

function Chapter(props) {
  const title = useRef(props.chapterTitle);
  const content = useRef(props.chapterContent);

  const handleTitleChange = (e) => {
    title.current = e.target.value;
    // let title_no_html = (' ' + e.target.value).slice(1).replaceAll("<h3>", "").replaceAll("</h3>", "");
    let title_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '').replace("&nbsp", ' ').replace(";", ' ');
    let updatedChapter = { chapterTitle: title_no_html };
    console.log("chapter was updated", updatedChapter);
    props.update(props.uuid, updatedChapter);
  };
  const handleContentChange = (e) => {
    content.current = e.target.value;
    let content_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '')//.replace("&nbsp", ' ').replace(";", ' ');
    let updatedChapter = { chapterContent: content_no_html };
    props.update(props.uuid, updatedChapter);
  };

  return (
    <div className="chapter">
      {/* Chapter Title */}
      <ContentEditable
        // innerRef={this.titleEditable}
        html={"<h3>" + props.chapterTitle + "</h3>"}
        disabled={false}
        onChange={handleTitleChange}
      />
      {/* Chapter Content */}
      <ContentEditable
        // innerRef={this.contentEditable}
        html={"<p>" + props.chapterContent + "</p>"}
        disabled={false}
        onChange={handleContentChange}
      />
    </div>
  );
}

function Story(props) {
  const title = useRef(props.title);

  const handleTitleChange = (e) => {
    title.current = e.target.value;
    // let title_no_html = (' ' + e.target.value).slice(1).replaceAll("<h2>", "").replaceAll("</h2>", "").replaceAll("<br>","");
    let title_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '').replace("&nbsp", ' ').replace(";", ' ')
    console.log(title_no_html)
    let updatedStory = { title: title_no_html };
    props.update(props.uuid, updatedStory);
  };

  let chapters = props.chapters.map((chapter) => (
    <Chapter
      uuid={chapter.uuid}
      chapterTitle={chapter.chapterTitle}
      chapterContent={chapter.chapterContent}
      key={chapter.uuid}
      update={props.update}
    />
  ));

  return (
    <div className="story-section">
      <div className="story-content">
        {/* Chapter Title */}
        <ContentEditable
          html={"<h2>" + props.title + "</h2>"}
          disabled={false}
          onChange={handleTitleChange}
        />
        {/* <br /> */}
      </div>
      <div className="story-chapters">
        {chapters}
        {/* {this.state.chapters.length === 0 ? defaultChapter : chapters} */}
      </div>
      <div>
        {/* <button onClick={exportHTML(title.current, title.current+"_contents")}> Export to Word </button> */}
        {/* <button onClick={this.handleSave}> Save </button> */}
      </div>
    </div>
  );
}
export { Chapter, Story };
