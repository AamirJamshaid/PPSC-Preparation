import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, Touchable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import url from '../url.json'
import { useNavigation } from '@react-navigation/native';
const items = [
  {
    id: '1',
    title: 'Subjects',
    image: url.Subject,
    nav: "Subjects"
  },
  {
    id: '2',
    title: 'Mock test',
    image: url.mock_test,
    nav:"Mock"

  },
  {
    id: '3',
    title: 'Past Papers',
    image: url.Past_paper,
    nav:"PaperSubjects"
  },
  {
    id: '4',
    title: 'Books',
    image: url.books,
    nav:"Books"

  },
  {
    id: '5',
    title: 'Subcription',
    image: url.Subscription,
    nav:"Subscribe"
  },
  // {
  //   id: '6',
  //   title: 'Item 6',
  //   image: url.image,
  // },

  // {
  //   id: '7',
  //   title: 'Item 7',
  //   image: url.image,
  // },


  // {
  //   id: '5',
  //   title: 'Item 8',
  //   image: url.image,
  // },

  // {
  //   id: '51',
  //   title: 'Item 9',
  //   image: url.image,
  // },
];



const Item = ({ nav, title, image, navigation }) => (
  <TouchableOpacity style={styles.item}

    onPress={() =>

      nav ? navigation.navigate(nav) : null
    }
  >
    <Image style={styles.itemImage} source={{ uri: image }} />
    <Text style={styles.itemTitle}>{title}</Text>
    <AntDesign name="right" size={24} color="#00401A" />
  </TouchableOpacity>
);

const Syllabus = () => {
  let navigation = useNavigation()
  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image} nav={item.nav} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    alignItems: 'center',
  },
  item: {
    width: '90%',
    height: 100,
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    // borderRadius: 30,
    marginRight: 20,
  },
  itemTitle: {
    fontSize: 18,
    color:'#00401A',
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Syllabus;
