import Metadados from '../index.vue';
import { mount } from '@vue/test-utils';

describe('Metadados', () => {
  test('fetch metadados correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ id: '1', title: 'Form de Teste"', fields: [{
        id: "f1",
        type: "text",
        name: "Texto de teste"
      },
      {
        id: "f2",
        type: "password",
        name: "Password"
      },
      {
        id: "f3",
        type: "int",
        name: "Inteiro"
      },
      {
        id: "f4",
        type: "card",
        name: "Dados",
        dataUri: "https://masterlink-mock-api.mwe.pt/MlkApi/bpm_data/1,f4"
      },
    ]
    })
  });

    const wrapper = mount(Metadados);

    await wrapper.vm.$options.fetch.call(wrapper.vm);

    expect(wrapper.vm.items.id).toBe('1');
    expect(wrapper.vm.items.title).toBe('Form de Teste"');
    expect(wrapper.vm.items.fields).toEqual([{
      id: "f1",
      type: "text",
      name: "Texto de teste"
    },
    {
      id: "f2",
      type: "password",
      name: "Password"
    },
    {
      id: "f3",
      type: "int",
      name: "Inteiro"
    },
    {
      id: "f4",
      type: "card",
      name: "Dados",
      dataUri: "https://masterlink-mock-api.mwe.pt/MlkApi/bpm_data/1,f4"
    },]);
    
    expect(wrapper.vm.error).toBe(false);
    expect(wrapper.vm.errorMessage).toBe('');
  });

  test('handles error correctly', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));
    const wrapper = mount(Metadados);

    await wrapper.vm.$options.fetch.call(wrapper.vm);

    expect(wrapper.vm.error).toBe(true);
    expect(wrapper.vm.errorMessage).toBe('An error occurred while fetching Metadados.');
  });
});
