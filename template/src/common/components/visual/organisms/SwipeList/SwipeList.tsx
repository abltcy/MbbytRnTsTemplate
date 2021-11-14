import {Box} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RowMap, SwipeListView} from 'react-native-swipe-list-view';
import {resizeHeight, resizeWidth} from 'src/common/constants';

type SwipeListType = {
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  swipeOnPress: (deletedItem: any) => void;
  SwipeListRenderItem: React.ReactNode;
  Icon: React.ReactNode;
};

export const SwipeList = ({
  data,
  swipeOnPress,
  SwipeListRenderItem,
  Icon,
}: SwipeListType) => {
  const onRowDidOpen = (rowKey: string) => {
    console.log('This row opened', rowKey);
  };

  const closeRow = (rowMap: RowMap<any>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<any>, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const prevIndex = data.findIndex(
      (item: {key: string}) => item.key === rowKey,
    );
    swipeOnPress(prevIndex);
  };

  const renderHiddenItem = (
    {item, index}: {item: any; index: number},
    rowMap: any,
  ) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 0,
          top: 0,
          right: 0,
          width: resizeWidth(70),
          backgroundColor: 'red',
        }}
        onPress={() => deleteRow(rowMap, item.key)}>
        <Box
          justifyContent="center"
          alignSelf="center"
          key={index + 'SwipeKeyIndex'}
          w={25}
          h={25}
          borderRadius={8}
          borderWidth={1}
          borderColor="gray">
          <Box justifyContent="center" alignItems="center">
            {/* @ts-ignore */}
            <Icon
              size={resizeHeight(17)}
              name="ios-trash-outline"
              color="white"
            />
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <SwipeListView
      data={data}
      // @ts-ignore
      renderItem={({item}: {item: any}) => <SwipeListRenderItem item={item} />}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={resizeWidth(-70)}
      previewOpenValue={-60}
      previewRowKey={'0'}
      previewOpenDelay={300}
      onRowDidOpen={onRowDidOpen}
    />
  );
};
