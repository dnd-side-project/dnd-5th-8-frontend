import * as React from 'react';

import { Text, View, Button } from 'react-native';

export default function CategorySelection () {
    const sendCategory = () => {
        //Todo : 서버에 카테고리들 보내기
    }

    const startGame = () => {
        sendCategory();
        //Todo : 로딩 스크린으로 이동
    }

    const saveCategory = () => {
        // Todo : 누른 카테고리들 상태에 저장
    }

    return (
        <View>
        <Text>
          오늘은 무슨 이야기를 할까요?
        </Text>
        <Button
            title="친구관계"
            onPress={() => saveCategory
            }
        />
        <Button
            title="이성관계"
            onPress={() => saveCategory
            }
        />
        <Button
            title="가족관계"
            onPress={() => saveCategory
            }
        />
        <Button
            title="고민"
            onPress={() => saveCategory
            }
        />
        <Button
            title="계획"
            onPress={() => saveCategory
            }
        />
        <Button
            title="나의 이야기"
            onPress={() => saveCategory
            }
        />
        <Button
            title="누가누가 게임"
            onPress={() => saveCategory
            }
        />
        <Button
            title="밸런스 게임"
            onPress={() => saveCategory
            }
        />
        <Button
            title="빈칸 게임"
            onPress={() => saveCategory
            }
        />
        <Button
          title = '준비 완료'
          onPress = {startGame}
        />
        </View>
    );
}
