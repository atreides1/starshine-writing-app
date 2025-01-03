import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";

function Chapter(props) {
  const title = useRef(props.chapterTitle);
  const content = useRef(props.chapterContent);

  const handleTitleChange = (e) => {
    title.current = e.target.value;
    let title_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '').replace("&nbsp", ' ').replace(";", ' ');
    let updatedChapter = { chapterTitle: title_no_html };
    props.update(props.uuid, updatedChapter);
  };
  const handleContentChange = (e) => {
    content.current = e.target.value;
    let content_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '')
    let updatedChapter = { chapterContent: content_no_html };
    props.update(props.uuid, updatedChapter);
  };

  return (
    <div className="chapter">
      {/* Chapter Title */}
      <ContentEditable
        html={"<h3>" + props.chapterTitle + "</h3>"}
        disabled={false}
        onChange={handleTitleChange}
      />
      {/* Chapter Content */}
      <ContentEditable
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
    let title_no_html = (' ' + e.target.value).slice(1).replace( /(<([^>]+)>)/ig, '').replace("&nbsp", ' ').replace(";", ' ')
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

        <ContentEditable
          html={"<h2>" + props.title + "</h2>"}
          disabled={false}
          onChange={handleTitleChange}
        />
      </div>
      <div className="story-chapters">
        {chapters}
      </div>
    </div>
  );
}
export { Chapter, Story };
