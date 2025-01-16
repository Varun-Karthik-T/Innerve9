import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import  Page1  from '../components/contractor/page1';
import  Page2  from '../components/contractor/page2';

const TenderRoute = () => <Page1></Page1>;

const ContractRoute = () => <Page2></Page2>;

const ContractBottom = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Tender', title: 'Tenders', focusedIcon: 'file-document-multiple'},
    { key: 'Contract', title: 'Contract', focusedIcon: 'file-sign' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Tender: TenderRoute,
    Contract: ContractRoute,
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