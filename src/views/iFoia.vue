<template>
  <b-container>
    <b-row>
      <b-col lg="8" style="align-items=center">
      <div>
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
            name="ufficio"
            type="text"
            label="Ufficio"
            validation="required"
          />
          <FormulateInput
            name="ente"
            type="text"
            label="Ente Pubblico"
            validation="required"
          />
          
      </div>
      <div class="double-wide">
        <FormulateInput
          name="nome"
          type="text"
          label="Nome"
          placeholder="Mario"
          validation="required"
        />
        <FormulateInput
          name="cognome"
          type="text"
          label="Cognome"
          placeholder="Rossi"
          validation="required"
        />
      </div>
      <FormulateInput
          name="luogo"
          type="text"
          label="Comune di nascita"
          placeholder="Roma"
          validation="required"
          :validation-messages="{
            required: 'Comune di nascita è un campo obbligatiorio.'
          }"
      />
      <FormulateInput
          name="provincia"
          :options= "province"
          type="select"
          placeholder="Seleziona un'opzione"
          label="Provincia"
          validation="required"
      />
      <FormulateInput
          name="cap"
          type="number"
          label="CAP"
          placeholder="-"
          validation="required"
          :validation-messages="{
            required: 'CAP è un campo obbligatiorio.'
          }"
      />
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
    </div>
    </b-col>
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
      formValues: {},
      province:  {
        'AG' : 'Agrigento',
        'AL' : 'Alessandria',
        'AN' : 'Ancona',
        'AO' : 'Aosta',
        'AR' : 'Arezzo',
        'AP' : 'Ascoli Piceno',
        'AT' : 'Asti',
        'AV' : 'Avellino',
        'BA' : 'Bari',
        'BT' : 'Barletta-Andria-Trani',
        'BL' : 'Belluno',
        'BN' : 'Benevento',
        'BG' : 'Bergamo',
        'BI' : 'Biella',
        'BO' : 'Bologna',
        'BZ' : 'Bolzano',
        'BS' : 'Brescia',
        'BR' : 'Brindisi',
        'CA' : 'Cagliari',
        'CL' : 'Caltanissetta',
        'CB' : 'Campobasso',
        'CI' : 'Carbonia-Iglesias',
        'CE' : 'Caserta',
        'CT' : 'Catania',
        'CZ' : 'Catanzaro',
        'CH' : 'Chieti',
        'CO' : 'Como',
        'CS' : 'Cosenza',
        'CR' : 'Cremona',
        'KR' : 'Crotone',
        'CN' : 'Cuneo',
        'EN' : 'Enna',
        'FM' : 'Fermo',
        'FE' : 'Ferrara',
        'FI' : 'Firenze',
        'FG' : 'Foggia',
        'FC' : 'Forlì-Cesena',
        'FR' : 'Frosinone',
        'GE' : 'Genova',
        'GO' : 'Gorizia',
        'GR' : 'Grosseto',
        'IM' : 'Imperia',
        'IS' : 'Isernia',
        'SP' : 'La Spezia',
        'AQ' : 'L\'Aquila',
        'LT' : 'Latina',
        'LE' : 'Lecce',
        'LC' : 'Lecco',
        'LI' : 'Livorno',
        'LO' : 'Lodi',
        'LU' : 'Lucca',
        'MC' : 'Macerata',
        'MN' : 'Mantova',
        'MS' : 'Massa-Carrara',
        'MT' : 'Matera',
        'ME' : 'Messina',
        'MI' : 'Milano',
        'MO' : 'Modena',
        'MB' : 'Monza e della Brianza',
        'NA' : 'Napoli',
        'NO' : 'Novara',
        'NU' : 'Nuoro',
        'OT' : 'Olbia-Tempio',
        'OR' : 'Oristano',
        'PD' : 'Padova',
        'PA' : 'Palermo',
        'PR' : 'Parma',
        'PV' : 'Pavia',
        'PG' : 'Perugia',
        'PU' : 'Pesaro e Urbino',
        'PE' : 'Pescara',
        'PC' : 'Piacenza',
        'PI' : 'Pisa',
        'PT' : 'Pistoia',
        'PN' : 'Pordenone',
        'PZ' : 'Potenza',
        'PO' : 'Prato',
        'RG' : 'Ragusa',
        'RA' : 'Ravenna',
        'RC' : 'Reggio Calabria',
        'RE' : 'Reggio Emilia',
        'RI' : 'Rieti',
        'RN' : 'Rimini',
        'RM' : 'Roma',
        'RO' : 'Rovigo',
        'SA' : 'Salerno',
        'VS' : 'Medio Campidano',
        'SS' : 'Sassari',
        'SV' : 'Savona',
        'SI' : 'Siena',
        'SR' : 'Siracusa',
        'SO' : 'Sondrio',
        'TA' : 'Taranto',
        'TE' : 'Teramo',
        'TR' : 'Terni',
        'TO' : 'Torino',
        'OG' : 'Ogliastra',
        'TP' : 'Trapani',
        'TN' : 'Trento',
        'TV' : 'Treviso',
        'TS' : 'Trieste',
        'UD' : 'Udine',
        'VA' : 'Varese',
        'VE' : 'Venezia',
        'VB' : 'Verbano-Cusio-Ossola',
        'VC' : 'Vercelli',
        'VR' : 'Verona',
        'VV' : 'Vibo Valentia',
        'VI' : 'Vicenza',
        'VT' : 'Viterbo',
    }
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
  max-width: 2000px;
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