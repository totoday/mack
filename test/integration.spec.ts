import {markdownToBlocks} from '../src';
import * as slack from '../src/slack';

describe('integration with unified', () => {
  it('should parse raw markdown into slack blocks', async () => {
    const text = `
a **b** _c_ **_d_ e**

# heading **a**

![59953191-480px](https://user-images.githubusercontent.com/16073505/123464383-b8715300-d5ba-11eb-8586-b1f965e1f18d.jpg)

<img src="https://user-images.githubusercontent.com/16073505/123464383-b8715300-d5ba-11eb-8586-b1f965e1f18d.jpg" alt="59953191-480px"/>

> block quote **a**
> block quote b

[link](https://apple.com)

- bullet _a_
- bullet _b_

1. number _a_
2. number _b_

- [ ] checkbox false
- [x] checkbox true

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
`;

    const actual = await markdownToBlocks(text);

    const expected = [
      slack.section('a *b* _c_ *_d_ e*'),
      slack.header('heading a'),
      slack.image(
        'https://user-images.githubusercontent.com/16073505/123464383-b8715300-d5ba-11eb-8586-b1f965e1f18d.jpg',
        '59953191-480px'
      ),
      slack.image(
        'https://user-images.githubusercontent.com/16073505/123464383-b8715300-d5ba-11eb-8586-b1f965e1f18d.jpg',
        '59953191-480px'
      ),
      slack.section('> block quote *a* block quote b'),
      slack.section('<https://apple.com|link> '),
      slack.section('• bullet _a_\n• bullet _b_'),
      slack.section('1. number _a_\n2. number _b_'),
      slack.section('• checkbox false\n• checkbox true'),
      slack.section(
        '```\n' +
          '| Syntax | Description |\n' +
          '| --- | --- |\n' +
          '| Header | Title |\n' +
          '| Paragraph | Text |\n' +
          '```'
      ),
    ];

    console.log(JSON.stringify(expected, null, 3));

    expect(actual).toStrictEqual(expected);
  });
});
