// PDFDocument.js
import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  listItem: {
    marginBottom: 10,
  },
});

const dates = new Date()

const PDFDocument = ({ account, user }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.listItem}>
        <Text>
          Infosys Bank</Text>
          <Text>Bank Statement</Text>
          
          
          <Text>{user.firstName} {user.middleName} {user.lastName}</Text>
          <Text>{`${user.addressDTO.buildingNo}, ${user.addressDTO.firstLine},
            ${user.addressDTO.secondLine}, ${user.addressDTO.city},
            ${user.addressDTO.county}, ${user.addressDTO.postCode},
            ${user.addressDTO.country}`}</Text>
        </View>
        <View>
            <Text>Your account summary upto: {dates}</Text>
        </View>

        {account[4]
          .slice()
          .sort((a, b) => a.transLogId - b.transLogId)
          .map((transLog, logIndex) => (
            <View key={logIndex} style={styles.listItem}>
              
              
              <Text>
                ID: {transLog.transLogId} | Date: {transLog.date} | Previous Balance: {transLog.oldBal} | From Account: {transLog.from} | Amount: {transLog.amount} | Reference: {transLog.reference} | New Balance: {transLog.newBal} | To Account: {transLog.to}
              </Text>
              
            </View>
          ))}
      </Page>
    </Document>
  );
};

PDFDocument.propTypes = {
  account: PropTypes.array,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    addressDTO: PropTypes.shape({
      buildingNo: PropTypes.string,
      firstLine: PropTypes.string,
      secondLine: PropTypes.string,
      city: PropTypes.string,
      county: PropTypes.string,
      postCode: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};


export default PDFDocument;

