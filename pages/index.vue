
<template>
  <main>
    <v-container>
      <v-row @click.stop.prevent="addNewNote">
        <v-col offset="1" cols="10" sm="10" md="10">
          <v-text-field
            class="mt-5"
            id="new-note"
            label="... take a note"
            prepend-inner-icon="mdi-pen"
            hide-details="auto"
            solo
            rounded
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- <note-dialog
        :showButton="true"
        :setShowDialog="showDialog"
        :setNote="selectedNote"
        @closing="dialogClosingHandler"
        @note-updated="updateNote"
      /> -->
      <prose-dialog
        :showButton="true"
        :setShowDialog="showDialog"
        :inputNote="selectedNote"
        @closing="dialogClosingHandler"
        @note-updated="updateNote"
      />

      <ul class="note-list">
        <note
          v-for="(note, index) in noteList"
          :note="note"
          :key="note.id"
          @note-clicked="noteClicked(note)"
          @remove="noteList.splice(index, 1)"
          @toggle-stared="toggleStared(note)"
        >
        </note>
      </ul>
    </v-container>

    <!--
      <NuxtLink to="/about"> About </NuxtLink>
    <br />
     <h1>I am rendered on the {{ renderedOn }} side</h1> -->
  </main>
</template>

<script>
import Helpers from "@/common/helpers.js";

export default {
  mounted() {
    // console.log("IndexVue.mounted, assure htmlContent");
    // this.nodeList = this.noteList.map((note) => {
    //   return this.assureHtmlContentOnNote(note);
    // });
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    //   setTimeout(() => this.$nuxt.$loading.finish(), 500);
    // });
  },
  head() {
    return {
      title: "My Notes",
    };
  },
  data() {
    return {
      showDialog: false,
      selectedNote: null,
      /**
       * We add htmlContent at the fly from the content, which is markdown
       */
      noteList: [
        {
          id: "121",
          title: "Here comes one",
          htmlContent: "",
          content: `Here comes one and more if you want bla bloo und so weiter  
Alles weitere geht nicht 
# Wir brauchen 
[mein link](www.example.com)  
![alt](https://jasmine.github.io/images/jasmine-purple-horizontal.svg "my title")  
          Here comes one and more if you want bla bloo und so weiter`,
          createdAt: "2021-12-20T07:46:36.611Z",
          tags: ["tech", "social"],
          stared: false,
        },
        {
          id: "122",
          title: "",
          content: "Here comes two",
          createdAt: "2021-12-20T08:46:36.611Z",
          tags: ["tech", "web"],
          stared: true,
        },
        {
          id: "123",
          title: "",
          content: "Das ist Drei",
          createdAt: "2021-12-20T09:46:36.611Z",
          tags: ["tech", "web", "nodejs"],
          stared: true,
        },
        {
          id: "124",
          title: "Der Vierte",
          content: "Voila Quatro, der vierte und so ",
          createdAt: "2021-12-20T09:46:36.611Z",
          tags: ["tech", "web", "nodejs"],
          stared: false,
        },
        {
          id: "125",
          title: "Test 125",
          content: "Voila Quatro, der vierte und so ",
          createdAt: "2021-12-20T09:46:36.611Z",
          tags: ["tech", "web", "nodejs"],
          stared: false,
        },
        {
          id: "126",
          title: "Test 126",
          content: "Test 126 ",
          createdAt: "2021-12-20T09:46:36.611Z",
          tags: ["tech", "web", "nodejs"],
          stared: false,
        },
        {
          id: "127",
          title: "Test 127",
          content: "Test 127 ",
          createdAt: "2021-12-20T09:46:36.611Z",
          tags: ["tech", "web", "nodejs"],
          stared: false,
        },
      ],
    };
  },
  // like data in Vue3 but async
  asyncData() {
    return { renderedOn: process.client ? "client" : "server" };
  },
  computed: {
    noteCount() {
      return this.noteList.length;
    },
  },
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
    addNewNote() {
      console.log("indexVue.addNewNote");
      let newNote = {
        id: Helpers.getNoteId(),
        content: "",
        createdAt: new Date().toISOString(),
        tags: [],
        stared: false,
      };
      newNote = Helpers.assureHtmlContentOnNote(newNote);
      this.openNote(newNote);
    },
    updateNote(updatedNote) {
      console.log("indexVue.updateNote", updatedNote.title);
      const noteIndex = this.noteList.findIndex(
        (noteInList) => updatedNote.id === noteInList.id
      );
      if (noteIndex > -1) {
        this.noteList.splice(noteIndex, 1);
      }

      const cleanNote = Helpers.sanitizeNote(updatedNote);
      this.noteList.unshift(cleanNote);
    },

    dialogClosingHandler() {
      console.log("indexVue.dialogClosingHandler");
      this.showDialog = false;
      this.selectedNote = null;
    },
    noteClicked(note) {
      console.log("indexVue.noteClicked", note.title);
      this.openNote(note);
    },
    openNote(note) {
      this.selectedNote = note;
      this.showDialog = true;
    },
    toggleStared(note) {
      note.stared = !note.stared;
    },
  },
};
</script>

<style>
.red {
  color: red;
}

ul.note-list {
  list-style: none;
  padding-left: 0;
}
</style>