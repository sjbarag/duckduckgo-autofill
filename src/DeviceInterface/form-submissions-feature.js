import {SUBMIT_BUTTON_SELECTOR} from "../Form/selectors-css";
import {removeExcessWhitespace} from "../Form/matching";
import {buttonMatchesFormType} from "../autofill-utils";
import listenForGlobalFormSubmission from "../Form/listenForFormSubmission";

/**
 * @param {import("../Scanner").Scanner} scanner
 */
export function formSubmissions(scanner) {

    /**
     * Listen for global form submissions
     */
    listenForGlobalFormSubmission(scanner.forms)

    /**
     * We always register this 'pointerdown' event, regardless of
     * whether we have a tooltip currently open or not. This is to ensure
     * we can clear out any existing state before opening a new one.
     */
    window.addEventListener('pointerdown', (event) => {
        switch (event.type) {
            case 'pointerdown': {
                pointerDown(event)
                break
            }
        }
    }, true)

    function pointerDown(event) {
        const matchingForm = [...scanner.forms.values()].find(
            (form) => {
                const btns = [...form.submitButtons]
                // @ts-ignore
                if (btns.includes(event.target)) return true

                // @ts-ignore
                if (btns.find((btn) => btn.contains(event.target))) return true
            }
        )

        matchingForm?.submitHandler()

        if (!matchingForm) {
            // check if the click happened on a button
            const button = /** @type HTMLElement */(event.target)?.closest(SUBMIT_BUTTON_SELECTOR)
            if (!button) return

            const text = removeExcessWhitespace(button?.textContent)
            const hasRelevantText = /(log|sign).?(in|up)|continue|next|submit/i.test(text)
            if (hasRelevantText && text.length < 25) {
                // check if there's a form with values
                const filledForm = [...scanner.forms.values()].find(form => form.hasValues())
                if (filledForm && buttonMatchesFormType(/** @type HTMLElement */(button), filledForm)) {
                    filledForm?.submitHandler()
                }
            }
        }
    }
}
