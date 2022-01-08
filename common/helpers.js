import { marked } from "marked";
import DOMPurify from "dompurify";

export default class Helpers {
  static sanitizeNote(note) {
    const newNote = { ...note };
    newNote.content = DOMPurify.sanitize(newNote.content);
    newNote.title = DOMPurify.sanitize(newNote.title);
    return newNote;
  }

  static assureHtmlContentOnNote(note) {
    console.log("Helpers.assureHtmlContentOnNote", note.title);
    const newNote = { ...note };
    newNote.htmlContent = marked(newNote.content);
    console.debug("newNote.htmlContent", newNote.htmlContent);
    return newNote;
  }

  static getNoteId() {
    return Math.floor(Math.random() * 1000 ** 4).toString();
  }

  static getHashCode(s) {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  }
}
