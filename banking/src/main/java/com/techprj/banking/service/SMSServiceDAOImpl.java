package com.techprj.banking.service;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SMSServiceDAOImpl {
	
	private final static String ACCOUNT_SID = "AC11387d5a290c04d080173351033504dd";
	private final static String AUTH_ID = "a5bb743ef2991e000ebc35aab480c4d1";
	
	static {
		Twilio.init(ACCOUNT_SID, AUTH_ID);
	}
	
	public boolean send2FaCode(String mobilenumber, String twoFaCode) {
		
		Message.creator(new PhoneNumber(mobilenumber), new PhoneNumber("+447893951546"),
				"Your Two Factor Auuthentication code is: " + twoFaCode).create();
		
		return true;
		
	}

}
