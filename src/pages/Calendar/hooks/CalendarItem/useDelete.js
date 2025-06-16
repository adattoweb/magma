export default function useDelete(setIsDisplay, index) {
    localStorage.removeItem(`calendar-item-${index}`);
    setIsDisplay(false);
}