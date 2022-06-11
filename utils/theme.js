const defaultColors = {
    primary: '#FFAC33', // primary color for your app, usually your brand color.
    background: '#F2F2F2', // background color for pages, such as lists.
    card: '#ffffff', // background color of card-like elements, such as headers, tab bars etc.
    text: '#000', // text color of various elements.
    disabled: '#999999', // color for disabled elements.
    placeholder: '#999999', // color for placeholder text, such as input placeholder.
    border: '#636365', // border color for elements such as cards, lists, and separators.
    onTouch: '#D2D2D7', // color for touchable elements response, such as buttons, tabs, etc.
    backdrop: '#000', // color for backdrops of various components such as modals.
    onSurface: '#000', // color for elements on the surface of things, such as the bottom sheet background.
    notification: '#EB445A', // background color for badges.
    success: '#00B865', // color for success states.
    warning: '#FFA000', // color for warning states.
    error: '#F44336', // color for error states.
    black: '#1D1D1D', // color for black states.
}

const darkColors = {
    ...defaultColors,
    background: '#1D1D1D', // background color for pages, such as lists.
    card: '#171717', // background color for elements containing content, such as cards.
    text: '#F5F4FF', // text color for content.
    backdrop: '#424242', // color for backdrops of various components such as modals.
    onSurface: '#424242', // color for elements on the surface of things, such as the bottom sheet background.
}

export const defaultNoteColor = {
    name: 'default',
    background: '#FFF2AB',
    text: '#000',
}

const noteColors = [
    defaultNoteColor,
    { name: 'green', background: '#C8F7C5', text: '#000' },
    { name: 'blue', background: '#B3E5FC', text: '#000' },
    { name: 'pink', background: '#FFCCE5', text: '#000' },
    { name: 'black', background: '#444444', text: '#FFF' },
    { name: 'white', background: '#F9F9F9', text: '#000' },
]

const fonts = {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    light: 'Roboto-Light',
    thin: 'Roboto-Thin',
    bold: 'Roboto-Bold',
}

const spacing = {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 40,
    huge: 48,
}

const theme = {
    colors: defaultColors,
    noteColors,
    fonts,
    spacing,
    roundness: 2,
}

export const defaultTheme = {
    ...theme,
}

export const darkTheme = {
    ...theme,
    colors: darkColors,
}
