export const twoFactorLoginTemplate = (replace: any) => {
  return `<p>Dear ${replace.name}, <br><br>
          Thank you for registration in Akmal Academy online courses That's great.
          Good job.<br>
          Please use the following code to login your account:<br> 
          ${replace.code}<br><br>  
          Please note that the link is only valid for next 10 minutes.<br><br>
          Best Regards,<br>
          Akmal Academy.</p>`;
};
