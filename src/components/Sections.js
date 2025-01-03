import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Card, CardHeader, CardContent, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

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
    let updatedChapter = { chapterContent: content.current };
    props.update(props.uuid, updatedChapter);
  };

  return (
    (
    <Card>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              props.delete(props.uuid);
            }}
            size="large">
            <Delete />
          </IconButton>
        }
        title={
          <Typography>
            <ContentEditable
              html={"<h3>" + props.chapterTitle + "</h3>"}
              disabled={false}
              onChange={handleTitleChange}
            />
          </Typography>
        }
      ></CardHeader>
      <CardContent>
        <Typography>
          <ContentEditable
            html={content.current}
            disabled={false}
            onChange={handleContentChange}
          />
        </Typography>
      </CardContent>
    </Card>
    )
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
      delete={props.delete}
    />
  ));

  return (
    (<Card elevation={6}>
      <CardHeader
        action={
          <IconButton onClick={() => props.delete(props.uuid)} size="large">
            <Delete />
          </IconButton>
        }
        title={
          <ContentEditable
            html={"<h2>" + props.title + "</h2>"}
            disabled={false}
            onChange={handleTitleChange}
          />
        }
      >
      </CardHeader>
      {chapters}
    </Card>)
  );
}
export { Chapter, Story };
