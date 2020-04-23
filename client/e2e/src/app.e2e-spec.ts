import { AppComponent } from './app.po';

describe('new App', () => {
  let page: AppComponent;

  beforeEach(() => {
    page = new AppComponent();
  });

  it('should be blank', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('The world is your oyster.');
  });
});
