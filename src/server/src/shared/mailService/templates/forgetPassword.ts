export const forgetPasswordTemplate = (replace: any) => {
  return `<p>Dear Valuable Customer,<br>
            We have sent you this email in response to your request to reset your password on Estshara App. <br>
            To reset your password please use this code: ${replace.code}<br>
            We recommend that you keep your password secure and not share it with anyone.<br><br>            
            Sincerely, <br>
            Akmal Support Team</p>`;
};
