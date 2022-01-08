<template>
  <!-- nice form example https://codepen.io/pen/?&editors=101 -->
  <!-- @input event is fired when closing by external click -->
  <v-container>
    <v-dialog
      v-model="showDialog"
      @close="close"
      @input="close"
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <v-text-field
            ref="titlefield"
            :autofocus="true"
            solo
            hide-details
            label="Title"
            v-model="innerNote.title"
          ></v-text-field>
        </v-card-title>

        <!-- we could add @input="updateContent" 
but the model is doeing it -->
        <v-card-text style="position: relative">
          <v-textarea
            class="mx-n2"
            name="input-content"
            label="my new note ..."
            v-model="innerNote.content"
            maxlength="2000"
            rows="4"
            solo
            flat
            hide-details
            auto-grow
          ></v-textarea>
          <v-fab-transition>
            <v-btn
              :key="previewBtn.icon"
              :color="previewBtn.color"
              @click="togglePreview"
              fab
              dark
              absolute
              bottom
              right
              small
              class="v-btn--example"
            >
              <v-icon>{{ previewBtn.icon }}</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-card-text>

        <div class="preview-info px-7 pb-0">
          <div v-if="isPreviewVisible">
            <span class="preview-label">Preview :</span>
            <div class="preview" v-html="compiledMarkdown"></div>
          </div>
          <v-chip-group>
            <v-chip
              v-for="tag in innerNote.tags"
              :key="tag"
              class="mr-2"
              close
              small
              @click:close="deleteTag"
              >{{ tag }}</v-chip
            >
          </v-chip-group>
        </div>
        <v-card-actions>
          <small>{{ niceDate }}</small>
          <!-- <div class="ml-1 text-subtitle-1">15/10/2010 20:35</div> -->
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text rounded @click="close"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/**
 * https://vuetifyjs.com/en/components/dialogs/
 */
// import _ from "lodash";
import Helpers from "@/common/helpers.js";

export default {
  props: {
    showButton: Boolean,
    setShowDialog: {
      type: Boolean,
      default: false,
    },
    inputNote: Object,
  },
  emits: ["note-updated", "closing"],
  data() {
    return {
      innerNote: this.getDefaultNote(),
      newNoteText: "",
      showDialog: false,
      isPreviewVisible: false,
    };
  },
  computed: {
    niceDate() {
      return new Date(this.innerNote.createdAt).toLocaleString("fr-FR");
    },
    compiledMarkdown() {
      // console.log("NoteDialog.computed.compiledMarkdown");
      const noteWithHtml = Helpers.assureHtmlContentOnNote(this.innerNote);
      return noteWithHtml.htmlContent;
    },
    previewBtn() {
      return this.isPreviewVisible
        ? { color: "success", icon: "mdi-eye-off" }
        : { color: "success", icon: "mdi-eye" };
    },
  },
  watch: {
    setShowDialog: function (newShowDialog, oldShowDialog) {
      // console.log("watch setShowDialog", newShowDialog);
      this.showDialog = newShowDialog;

      if (this.showDialog) {
        this.initNote(this.inputNote);
      }
    },
    innerNote: function (val, oldVal) {
      // console.log(`watch innerNote.content`);
      if (this.showDialog && this.objectContentHasChanged(val, oldVal)) {
        // console.log(`watch innerNote.content val=${val}, oldVal=${oldVal} `);
        this.dataChanged();
      }
    },
  },
  methods: {
    getDefaultNote() {
      return {
        id: Helpers.getNoteId(),
        createdAt: new Date().toISOString(),
        title: "",
        content: "",
        tags: [],
        stared: false,
      };
    },
    objectContentHasChanged(val, oldVal) {
      let result = false;
      if (val && oldVal && val.id === oldVal.id) {
        result = val.title !== oldVal.title || val.content !== oldVal.content;
      }
      return result;
    },
    initNote(incommingNote) {
      // this.setFocusToTitle();
      if (!incommingNote) {
        this.innerNote = this.getDefaultNote();
      } else {
        // console.log(
        //   "NoteDialog.watch this.innerNote = new Note",
        //   incommingNote.title
        // );
        this.innerNote = { ...incommingNote };
      }
    },
    setFocusToTitle() {
      this.$refs.titlefield && this.$refs.titlefield.focus();
    },
    deleteTag(tag) {},

    togglePreview() {
      this.isPreviewVisible = !this.isPreviewVisible;
    },
    // updateContent() {
    //   console.log("NoteDialog.updateContent");
    //   _.debounce(function (e) {
    //     //this.input = e.target.value;
    //   }, 300);
    // },
    dataChanged() {
      // console.log("NoteDialog.changeHandler");
      const updatedNote = Helpers.sanitizeNote(this.innerNote);
      this.$emit("note-updated", updatedNote);
      // _.debounce(function () {}, 300);
    },
    // close is always saving
    close() {
      // console.log("NoteDialog.close()");
      if (this.objectContentHasChanged(this.inputNote, this.innerNote)) {
        // console.log("NoteDialog.close() call dataChanged");
        this.dataChanged();
      }

      this.$emit("closing");
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
.preview {
  min-height: 150px;
  border: 1px solid #DDD;
}
.preview-label {
  font-weight: bold;
}
</style>