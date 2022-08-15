export default function createElement(tag, ...classList) {
    const element = document.createElement(tag);
    element.classList.add(...classList);
    return element;
}


