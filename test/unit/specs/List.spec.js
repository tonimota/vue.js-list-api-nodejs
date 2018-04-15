import List from '@/components/List/list';
import { mount } from 'avoriaz';

const wrapper = mount(List);

it('should render correct contents', () => {
  expect(wrapper.find('.title-description')[0].text())
    .to.equal('Camisa Nike Corinthians I');
});
it('should size correct itens', () => {
  expect(wrapper.find('.item-list')[0].hasStyle('height', '390px'))
    .to.equal(true);
});
it('check quantity itens in object and list', () => {
  const ObjProduct = wrapper.data().products_list.length;
  expect(wrapper.find('.item-list').length)
    .to.equal(ObjProduct);
});
// it('simulate click in itens', () => {
//   expect(wrapper.find('.item-list')[0].click());
//   // expect(wrapper.vm.addItemCart())
//   //   .to.equal('Funcionou');
// });
