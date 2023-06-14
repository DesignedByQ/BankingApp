package com.techprj.banking.entity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


import jakarta.persistence.JoinColumn;
import org.joda.time.DateTime;

@Entity
@Table(name="log")
public class LoginLog {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long idLoginLog;
	private String iP;
	@Column(length = 1000)
	private String location;
	@Column(name="event_time")
	private LocalDateTime eventTime;
	@ManyToOne
	@JoinColumn(name="idUserProfile")
	private UserProfile userProfile;
	
	public LoginLog() {
		super();
	}

	public LoginLog(Long idLoginLog, String iP, String location, LocalDateTime eventTime, UserProfile userProfile) {
		super();
		this.idLoginLog = idLoginLog;
		this.iP = iP;
		this.location = location;
		this.eventTime = eventTime;
		this.userProfile = userProfile;
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

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	@Override
	public String toString() {
		return "LoginLog [idLoginLog=" + idLoginLog + ", iP=" + iP + ", location=" + location + ", eventTime="
				+ eventTime + ", userProfile=" + userProfile + "]";
	}
	
}
