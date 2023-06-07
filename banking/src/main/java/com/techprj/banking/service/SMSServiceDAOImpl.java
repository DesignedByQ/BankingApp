package com.techprj.banking.service;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SMSServiceDAOImpl {
	
	private final static String ACCOUNT_SID = "AC968a2bOOd5OfO722651453a449684b90";
	private final static String AUTH_ID = "Odd23574676c989771ec11Ob439ceabf";
	
	static {
		Twilio.init(ACCOUNT_SID, AUTH_ID);
	}
	
	public boolean send2FaCode(String mobilenumber, String twoFaCode) {
		
		Message.creator(new PhoneNumber(mobilenumber), new PhoneNumber("+19783103765"),
				"Your Two Factor Auuthentication code is: " + twoFaCode).create();
		
		return true;
		
	}

}
