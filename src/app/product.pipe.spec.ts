import { SortByDate } from './product.pipe';

describe('ProductPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByDate();
    expect(pipe).toBeTruthy();
  });
});
