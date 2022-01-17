//https://www.fandom.com/register
module.exports = `
<form id="signupForm" action="https://services.fandom.com/user-registration/users" method="POST">
    <div class="input-container">
        <input type="email" name="email" id="signupEmail" required="" data-manual-scoring="emailAddress">
        <label class="floating-label" for="signupEmail">Email</label>
    </div>
    <div class="input-container">
        <input type="text" name="username" id="signupUsername" maxlength="50" required="" data-manual-scoring="username">
        <label class="floating-label" for="signupUsername">Username</label>
    </div>
    <div class="input-container">
        <input type="password" name="password" class="input-password" id="signupPassword" autocomplete="off" required="" data-manual-scoring="password">
        <label class="floating-label" for="signupPassword">Password</label>
        <span class="input-icon password-toggler"></span>
    </div>
    <div class="input-container">
        <div class="birthdate-container input hide">
            <input type="number" name="month" class="fake-input birth-month" maxlength="2" max="12" placeholder="MM" required="">
            <span>/</span>
            <input type="number" name="day" class="fake-input birth-day" maxlength="2" max="31" placeholder="DD" required="">
            <span>/</span>
            <input type="number" name="year" class="fake-input birth-year" maxlength="4" max="2022" placeholder="YYYY" required="">
            <span></span>
        </div>
        <input type="text" name="birthdate" id="signupBirthDate" required="" data-manual-scoring="birthday">
        <label class="floating-label" for="signupBirthDate">Birthdate</label>
    </div>
    <label for="signupNewsletter" class="inline signup-newsletter-label">
				<input type="checkbox" name="marketingAllowed" id="signupNewsletter" class="inline custom-checkbox">Email me about FANDOM news and events
			</label>
    <input type="hidden" name="langCode" value="en">
    <input type="hidden" name="registrationWikiaId" value="177">
    <button id="signupSubmit" type="submit" class="form-submit" disabled=""><span>Register</span></button>
    <small class="terms-of-use" id="termsOfUse">
				By creating an account, you agree to <a href="https://www.fandom.com/terms-of-use" target="_blank">FANDOM's Terms of Use</a> and <a href="https://www.fandom.com/privacy-policy" target="_blank">Privacy Policy</a>
			</small>
</form>
`