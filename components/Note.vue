

<template>
  <li :id="'note_' + myNote.id" class="note">
    <small class="d-flex align-end flex-column mr-1">{{ niceDate }}</small>
    <!-- // or try this as a card -->
    <v-container @click="$emit('note-clicked', myNote)">
      <div v-if="!!myNote.title" class="note-title">
        <h2>{{ myNote.title }}</h2>
      </div>
      <div class="content-preview" v-html="htmlContent"></div>
    </v-container>
    <!-- <div class="note-content">{{ myNote.content }}</div> -->
    <v-container class="note-info">
      <v-row no-gutters>
        <v-col cols="12">
          <span
            class="note-star"
            v-html="this.starIcon"
            @click="$emit('toggle-stared')"
          ></span>
          <v-chip v-for="tag in myNote.tags" :key="tag" small class="mr-2">{{
            tag
          }}</v-chip>
        </v-col>
      </v-row>
    </v-container>
  </li>
</template>

<script>
import Helpers from "@/common/helpers.js";
/**
 * https://vuetifyjs.com/en/components/dialogs/
 */
const defaultNote = {
  id: "",
  title: "",
  content: "",
  createdAt: "",
  tags: [],
  stared: false,
};

export default {
  props: ["note"],
  emits: ["remove", "toggle-stared", "note-clicked"],
  computed: {
    myNote() {
      console.debug("note.computed.myNote");
      return this.note ? { ...this.note } : defaultNote;
    },
    htmlContent() {
      const noteWithHtml = Helpers.assureHtmlContentOnNote(this.myNote);
      return noteWithHtml.htmlContent;
    },
    niceDate() {
      return new Date(this.myNote.createdAt).toLocaleString("fr-FR");
    },
    starIcon() {
      return this.myNote.stared ? "&starf;" : "&star;";
    },
  },
  methods: {},
};
</script>

<style scoped>
li.note {
  border: 2px solid #dddddd;
  border-radius: 10px;
  margin-bottom: 10px;
}
.note .btn-delete {
  visibility: hidden;
}
.note:hover .btn-delete {
  visibility: visible;
}
.note-star {
  color: goldenrod;
  font-size: 1.5rem;
}
.note-info {
  background-color: #eee;
}
.delete-cross {
  color: red;
  content: "\274C";
  border: 1px solid #ccc;
  padding: 1px;
}
</style>