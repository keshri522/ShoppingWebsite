import React from "react";
// this is the separte compoents which will show the effect of typing based on parent components in which user pass the text as a props
import Typewriter from "typewriter-effect";
const Typewrittereffect = ({ text }) => {
  // text is an array of colletion that are passed from parent componets which which display on the ui
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default Typewrittereffect;
