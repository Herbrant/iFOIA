<template>
  <b-container>
    <b-row class="vh-100 text-center" align-v="center">
      <FormulateForm
      class="login-form"
      v-model="formValues"
      @submit="submitHandler"
    >
      <h2 class="form-title">iFOIA</h2>
      <p>
        Genera la tua richiesta FOIA
      </p>
      <div class="double-wide">
        <FormulateInput
          name="name"
          type="text"
          label="Nome"
          placeholder="Mario"
          validation="required"
        />
        <FormulateInput
          name="lastname"
          type="text"
          label="Cognome"
          placeholder="Rossi"
          validation="required"
        />
      </div>
      <FormulateInput
        name="email"
        type="email"
        label="Email"
        placeholder="mariorossi@gmail.com"
        validation="required|email"
      />
      <FormulateInput
        type="submit"
        label="Genera"
      />
      <pre
        class="code"
        v-text="formValues"
      />
    </FormulateForm>
    </b-row>
  </b-container>
</template>

<script>
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

export default {
  data () {
    return {
      formValues: {}
    }
  },
  methods: {
    renderDoc() {
      function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
      }
      loadFile(`./foia.docx`, function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);
        doc.setData({
          name: "Davide",
          lastname: "Carnemolla"
        });
        
        doc.render();

        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Output the document using Data-URI
        saveAs(out, "output.docx");
      });
    },
    submitHandler (data) {
      this.renderDoc(data)
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 75vh;
  min-width: 75vh;
}
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 1000px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>