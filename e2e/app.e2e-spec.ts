import { SlatesPage } from './app.po';

describe('slates App', () => {
  let page: SlatesPage;

  beforeEach(() => {
    page = new SlatesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
