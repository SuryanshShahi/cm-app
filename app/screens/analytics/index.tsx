import React from 'react';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { Heading } from '../../shared';
import { Text, View } from 'react-native';
import { Feather, FontAwesome } from '../../utils/Icons';
import tw from '../../utils/tailwind';
import { width } from '../../utils/constants';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { COLORS } from '../../utils/static';

const Analytics = () => {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
  ];
  const pieData = [
    { value: 120, color: COLORS.brand, text: 'Ground Rally' },
    { value: 120, color: 'yellow', text: 'Online' },
    { value: 120, color: 'red', text: 'Social' },
  ];
  return (
    <ScreenTemplate className="gap-y-6" parentClassName="bg-white">
      <View style={tw`gap-y-4`}>
        <Heading type="medium" size="xl">
          Party worker Analytics Overview
        </Heading>
        <Heading size="xs">Connected Social Media</Heading>
        <View style={tw`flex-row gap-x-4`}>
          {[
            { link: '', icon: <Feather name="twitter" size={24} /> },
            { link: '', icon: <Feather name="facebook" size={24} /> },
            { link: '', icon: <FontAwesome name="instagram" size={24} /> },
            { link: '', icon: <Feather name="youtube" size={24} /> },
          ].map(item => (
            <View
              style={tw`h-11 w-11 bg-orange-primary flex justify-center items-center rounded-full`}
            >
              {item.icon}
            </View>
          ))}
        </View>
      </View>
      <View style={tw`gap-y-4`}>
        <Heading type="medium" size="xl">
          Analytic Graph
        </Heading>
        <Heading size="sm">Event Attended (last 8 Months)</Heading>
        <View style={tw`-ml-2 mt-4`}>
          <BarChart
            data={data}
            noOfSections={5}
            barWidth={(width - 220) / 12}
            adjustToWidth
            parentWidth={width - 40}
            focusBarOnPress
            xAxisLabelTextStyle={tw`text-10px`}
            frontColor={COLORS.brand}
            yAxisTextStyle={tw`text-10px`}
            isAnimated
            xAxisLabelTexts={[
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]}
          />
          <View style={tw`flex-row items-center gap-x-2 justify-center mt-2`}>
            <View style={tw`h-2 w-2 bg-brand`} />
            <Text style={tw`text-xs text-secondary`}>2025</Text>
          </View>
        </View>
      </View>
      <View style={tw`gap-y-6`}>
        <Heading type="medium" size="xl">
          Contributed Type
        </Heading>
        <View style={tw`flex-row gap-x-4 items-center justify-between`}>
          <PieChart
            showText
            textColor="black"
            radius={120}
            textSize={14}
            data={pieData}
            animationDuration={500}
            labelsPosition="mid"
          />
          <View style={tw`gap-y-1`}>
            {['Ground Rally', 'Online', 'Social'].map((item, idx) => (
              <View key={item} style={tw`flex-row items-center gap-x-2`}>
                <View
                  style={tw.style(
                    `h-6px w-6px rounded-full`,
                    idx === 0
                      ? 'bg-brand'
                      : idx === 1
                      ? 'bg-yellow-400'
                      : 'bg-red-500',
                  )}
                />
                <Text style={tw`font-medium text-secondary`}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default Analytics;
