import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.fetch = jest.fn();

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('styled-components', () => {
  const React = require('react');

  const createStyledComponent = (tag, existingComponent = null) => {
    const StyledComponent = React.forwardRef((props, ref) => {
      const { children, className, ...otherProps } = props;

      const domProps = Object.keys(otherProps).reduce((acc, key) => {
        if (!key.startsWith('$')) {
          acc[key] = otherProps[key];
        }
        return acc;
      }, {});

      const Component = existingComponent || tag;

      return React.createElement(
        Component,
        {
          ...domProps,
          className: [className, props.variant || 'primary']
            .filter(Boolean)
            .join(' '),
          ref,
        },
        children
      );
    });

    StyledComponent.withConfig = () => StyledComponent;
    StyledComponent.displayName = existingComponent
      ? `styled(${existingComponent.displayName || 'Component'})`
      : `styled.${tag}`;

    return StyledComponent;
  };

  const styled = component => {
    const styledFn = (template, ...interpolations) => {
      if (typeof component === 'string') {
        return createStyledComponent(component);
      }
      return createStyledComponent('div', component);
    };

    styledFn.withConfig = () => styledFn;
    return styledFn;
  };

  const htmlTags = [
    'div',
    'span',
    'button',
    'input',
    'a',
    'img',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'ul',
    'ol',
    'li',
    'nav',
    'section',
    'article',
    'header',
    'footer',
    'main',
    'aside',
    'form',
    'label',
    'select',
    'option',
    'textarea',
    'table',
    'tbody',
    'thead',
    'tr',
    'td',
    'th',
  ];

  htmlTags.forEach(tag => {
    const styledTag = (template, ...interpolations) =>
      createStyledComponent(tag);
    styledTag.withConfig = () => styledTag;
    styled[tag] = styledTag;
  });

  const keyframes = jest.fn((strings, ...values) => {
    return strings.reduce((result, string, i) => {
      return result + string + (values[i] || '');
    }, '');
  });

  const css = jest.fn((strings, ...values) => {
    return strings.reduce((result, string, i) => {
      return result + string + (values[i] || '');
    }, '');
  });

  return {
    __esModule: true,
    default: styled,
    keyframes,
    css,
    ThemeProvider: ({ children }) => children,
    ServerStyleSheet: jest.fn().mockImplementation(() => ({
      collectStyles: children => children,
      getStyleElement: () => [],
      instance: {
        clearTag: jest.fn(),
      },
    })),
    StyleSheetManager: ({ children }) => children,
  };
});
