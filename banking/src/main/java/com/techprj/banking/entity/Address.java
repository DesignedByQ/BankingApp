package com.techprj.banking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="address")
public class Address {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "address_ID")
	private Integer addressID;
	private Integer buildingNo;
	private String firstLine;
	private String secondLine;
	private String city;
	private String county;
	private String postCode;
	private String country;
	@OneToOne(mappedBy = "address")
	private UserProfile userProfile;
	
	public Address() {
		super();
	}

	public Address(Integer addressID, Integer buildingNo, String firstLine, String secondLine, String city,
			String county, String postCode, String country) {
		super();
		this.addressID = addressID;
		this.buildingNo = buildingNo;
		this.firstLine = firstLine;
		this.secondLine = secondLine;
		this.city = city;
		this.county = county;
		this.postCode = postCode;
		this.country = country;
	}

	public Integer getAddressID() {
		return addressID;
	}

	public void setAddressID(Integer addressID) {
		this.addressID = addressID;
	}

	public Integer getBuildingNo() {
		return buildingNo;
	}

	public void setBuildingNo(Integer buildingNo) {
		this.buildingNo = buildingNo;
	}

	public String getFirstLine() {
		return firstLine;
	}

	public void setFirstLine(String firstLine) {
		this.firstLine = firstLine;
	}

	public String getSecondLine() {
		return secondLine;
	}

	public void setSecondLine(String secondLine) {
		this.secondLine = secondLine;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getPostCode() {
		return postCode;
	}

	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Override
	public String toString() {
		return "Address [addressID=" + addressID + ", buildingNo=" + buildingNo + ", firstLine=" + firstLine
				+ ", secondLine=" + secondLine + ", city=" + city + ", county=" + county + ", postCode=" + postCode
				+ ", country=" + country + "]";
	}

}
