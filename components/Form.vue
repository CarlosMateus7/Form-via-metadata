<template>
   <form  class=" mt-8 space-y-4"  @submit.prevent="submitForm">
    <h1 v-if="error" class="text-red-500 text-center">{{ errorMessage }}</h1>
    <h1 v-else class="text-xl text-gray-700 font-bold mb-4 text-center" style="color: #fa4616">{{ items.title }}</h1>
  
    <div class="max-w-md mx-auto" v-for="field in items.fields" :key="field.id">
      <label class="block text-gray-700" style="color: #fa4616"> {{ field.name }}</label>
      <input ref="input" v-if="field.id !== 'f4'" 
        class="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" 
        :type="field.type === 'int' ? 'number' : field.type"
        :id="field.id" 
        :name="field.name"
        required
        @input="($event) => validateNumber(field, $event)"
        />
    </div>

    <div class="flex flex-wrap justify-center">
        <div v-for="dadoItem in fData.data" :key="dadoItem.text" class="max-w-sm bg-white shadow-md rounded-lg overflow-hidden m-4 relative">
            <div class="h-180">
                <img :src="dadoItem.imageUri" :alt="dadoItem.text" class="w-full h-full">
            </div>
            <div class="flex-grow flex items-end justify-center h-20 absolute bottom-0 w-full">
                <a :href="dadoItem.link" target="_blank" class="block text-center hover:underline font-bold" style="color: #fa4616">{{ dadoItem.text }} </a>
            </div>
        </div>
    </div>

    <div class="flex justify-center" >
      <button type="submit" style="background-color: #fa4616" class="max-w-md w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
    </div>
  </form> 
</template>


<script lang="ts">
import { PropType } from 'vue';
import { DataUri, Fields, Metadados } from '~/pages/model';
import Vue from 'vue';

export default Vue.extend({
    name: 'Form',
    props: {
        items: {
            type: Object as PropType<Metadados>,
            required: true,
        },
        fData: {
            type: Object as PropType<DataUri>,
            required: true,
        },
        error: {
            type: Boolean,
            required: true,
        },
        errorMessage: {
            type: String,
            required: true,
        },
    },
    methods: {
        validateNumber(field: Fields, event: Event):void {
            const inputValue = event.target as HTMLInputElement;
            const value = inputValue.value;
           if (field.type === "int") {
                const intValue = parseInt(value);
                if (isNaN(intValue)) {
                    console.error('Invalid input. Expected a Number value.');
                    alert(`Please enter a valid number for ${field.name}`);
                }
            }           
        },
        submitForm() {
            alert('Form Submited!');
        }
    }
});
</script>