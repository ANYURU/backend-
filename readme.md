Consuming the Africa's talking API

ToDo
[x] Test Africa's talking API in the sandbox.
[ ] Build an express backend that react will provide the SMS service.

Re thought with supabase. 
[ ] create a trigger that:
    [ ] Listens to the user on signup.
    [ ] Extracts the number provided on signup. 
    [ ] Format it in a form of country code and number.
    [ ] Invoke the OTP generator.
    [ ] Store the OTP against the Phone number.
    [ ] Consume the Africa's talking API to send a message to the number provided.
    [ ] Veify the code by comparing the one entered by the user with the one recorded against the number.

that invokes the Africas talking API to send an SMS with an OTP to the number provided 
[ ] verify the OTP