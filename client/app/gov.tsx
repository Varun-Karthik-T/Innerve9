import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import  Page2  from '../components/gov/page2';
import  Page1  from '../components/gov/page1';
import Page3  from '../components/gov/page3';


const IssueRoute = () => <Page1></Page1>;

const ContractRoute = () => <Page2></Page2>;

const TenderRoute = () => <Page3></Page3>;

const ContractBottom = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Issue', title: 'Issues', focusedIcon: 'alert-circle', unfocusedIcon: 'alert-circle-outline' },
    {key: 'Tender', title: 'Tender', focusedIcon: 'file-document-multiple'},
    { key: 'Contract', title: 'Contract', focusedIcon: 'file-sign' },
    
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Issue: IssueRoute,
    Contract: ContractRoute,
    Tender: TenderRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default ContractBottom;