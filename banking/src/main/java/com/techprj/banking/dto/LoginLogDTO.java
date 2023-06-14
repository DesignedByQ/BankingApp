package com.techprj.banking.dto;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;

import org.joda.time.DateTime;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class LoginLogDTO {
	
	private Long idLoginLog;
	private String iP;
	private String location;
	private LocalDateTime eventTime;
	private UserProfileDTO userProfileDTO;
	
	public LoginLogDTO() {
		super();
	}

	public LoginLogDTO(Long idLoginLog, String iP, String location, LocalDateTime eventTime,
			UserProfileDTO userProfileDTO) {
		super();
		this.idLoginLog = idLoginLog;
		this.iP = iP;
		this.location = location;
		this.eventTime = eventTime;
		this.userProfileDTO = userProfileDTO;
	}

	public Long getIdLoginLog() {
		return idLoginLog;
	}

	public void setIdLoginLog(Long idLoginLog) {
		this.idLoginLog = idLoginLog;
	}

	public String getiP() {
		return iP;
	}

	public void setiP(String iP) {
		this.iP = iP;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public LocalDateTime getEventTime() {
		return eventTime;
	}

	public void setEventTime(LocalDateTime eventTime) {
		this.eventTime = eventTime;
	}

	public UserProfileDTO getUserProfileDTO() {
		return userProfileDTO;
	}

	public void setUserProfileDTO(UserProfileDTO userProfileDTO) {
		this.userProfileDTO = userProfileDTO;
	}

	@Override
	public String toString() {
		return "LoginLogDTO [idLoginLog=" + idLoginLog + ", iP=" + iP + ", location=" + location + ", eventTime="
				+ eventTime + ", userProfileDTO=" + userProfileDTO + "]";
	}
		
}
