const updateScrollable = (boardColumnRef: React.RefObject<HTMLDivElement>, boardColumnContentRef: React.RefObject<HTMLDivElement>) => {
    if (!boardColumnRef.current || !boardColumnContentRef.current) return;

    const boardColumnHeight = boardColumnRef.current.offsetHeight;
    const windowHeight = window.innerHeight - 100;
    boardColumnContentRef.current.style.maxHeight = `${windowHeight}px`;
    if (boardColumnHeight > windowHeight) {
        boardColumnContentRef.current.classList.add('scrollable');
    } else {
        boardColumnContentRef.current.classList.remove('scrollable');
    }
};

export default updateScrollable