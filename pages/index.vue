<template>
  <div>
    <Form :items="items" :fData="fData" :error="error" :errorMessage="errorMessage"/>
  </div>
</template>

<script lang="ts">
import './index.css';
import {Metadados, Fields, Dados, DataUri} from './model';
import Form from '../components/Form.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'Metadados',
  async fetch(this: { items: Metadados, fData: DataUri, error: boolean, errorMessage: string }) {
    try{
      const response = await fetch("https://masterlink-mock-api.mwe.pt/MlkApi/bpm_Metadata/1");
      const metadados = await response.json();
      this.items = metadados;

      const dataField = this.items.fields.find(field => field.dataUri);
      if (dataField) {
        const dataUri = dataField.dataUri;
        const dataUriResponse = await fetch(`${dataUri}`);
        const dataUriJson = await dataUriResponse.json();
        this.fData = dataUriJson;
      }
    } catch (error) {
      console.error("Error fetching Metadados:", error);
      this.error = true;
      this.errorMessage = "An error occurred while fetching Metadados.";
    }
  },
  data() {
    return {
      items: {
        id: '',
        title: '',
        fields: [] as Fields[],
      } as Metadados,
      fData: {
        id: '',
        parent:'',
        data: [] as Dados[],
      } as DataUri,
      error: false,
      errorMessage: '',
    };
  },
  components: {
    Form,
  },
});
</script>