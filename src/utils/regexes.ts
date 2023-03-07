export const REGEXES = {
    /**
     *  matches minimum 8 chars
     *  at least one lowercase and one uppercase character
     *  one number
     *  one special character
     */
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
};
