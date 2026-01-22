import React from 'react';
import { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { CardWrapper, Heading, Loader } from '../../shared';
import ScreenTemplate from '../../shared/ScreenTemplate';
import { UserCard } from '../../shared/UserCard';
import { width } from '../../utils/constants';
import { Feather, FontAwesome, Octicons } from '../../utils/Icons';
import { COLORS } from '../../utils/static';
import tw from '../../utils/tailwind';
import useLeaderboard from '../leaderboard/useHook';
import useHook from './useHook';

const Analytics = () => {
  const { data, isLoading } = useHook();
  const { leaderboard } = useLeaderboard();

  const eventGraphData = data?.eventAttendanceGraph ?? [];

  const chartData = eventGraphData.map(item => ({
    value: item.eventCount,
  }));

  const xAxisLabels = eventGraphData.map(item => item.month);

  const getChartYearDisplay = () => {
    if (eventGraphData.length === 0) return '2025';
    const years = [...new Set(eventGraphData.map(item => item.year))];
    if (years.length === 1) {
      return years[0].toString();
    }
    return `${Math.min(...years)}-${Math.max(...years)}`;
  };

  const chartYearDisplay = getChartYearDisplay();
  const dataLength = eventGraphData.length || 12;
  return (
    <ScreenTemplate className="gap-y-6" parentClassName="bg-white">
      {isLoading ? (
        <Loader size={48} />
      ) : (
        <>
          <View style={tw`gap-y-4`}>
            <Heading type="medium" size="xl">
              Party worker Analytics Overview
            </Heading>
            <Heading size="xs">Connected Social Media</Heading>
            <View style={tw`flex-row gap-x-4`}>
              {[
                {
                  link: '',
                  icon: <Feather name="twitter" size={24} />,
                  isVisible: data?.connectedSocialMedia?.twitter ? true : false,
                },
                {
                  link: '',
                  icon: <Feather name="facebook" size={24} />,
                  isVisible: data?.connectedSocialMedia?.facebook
                    ? true
                    : false,
                },
                {
                  link: '',
                  icon: <FontAwesome name="instagram" size={24} />,
                  isVisible: data?.connectedSocialMedia?.instagram
                    ? true
                    : false,
                },
              ]
                .filter(item => item.isVisible)
                .map(item => (
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
              Analytic Summary
            </Heading>
            <Heading size="sm">Event Attended (last 8 Months)</Heading>

            <View style={tw`flex-row gap-x-2`}>
              {[
                {
                  title: 'Leaderboard',
                  number: `# ${data?.activitySummary?.leaderboardRank ?? 0}`,
                  icon: (
                    <Octicons name="trophy" size={20} color={COLORS.brand} />
                  ),
                },
                {
                  title: 'Post Share',
                  number: data?.activitySummary?.postShares ?? 0,
                  icon: (
                    <Octicons name="trophy" size={20} color={COLORS.brand} />
                  ),
                },
                {
                  title: 'To CM',
                  number: data?.activitySummary?.votesToCM ?? 0,
                  icon: (
                    <Octicons name="trophy" size={20} color={COLORS.brand} />
                  ),
                },
              ].map((item, idx) => (
                <CardWrapper
                  key={idx}
                  className={`bg-brand/10 gap-y-2 self-start p-2 rounded-lg w-${
                    (width - 58) / 3
                  }px`}
                >
                  <View style={tw`flex-row items-center gap-x-2 bg-red`}>
                    {item.icon}
                    <Heading size="xs">{item.title}</Heading>
                  </View>
                  <Heading size="xl" type="medium" className="text-center">
                    {item.number}
                  </Heading>
                </CardWrapper>
              ))}
            </View>
            {[
              {
                title: 'Leaderboard',
                number: data?.activitySummary?.leaderboardRank ?? 0,
              },
              {
                title: 'Post Share',
                number: data?.activitySummary?.postShares ?? 0,
              },
              {
                title: 'To CM',
                number: data?.activitySummary?.votesToCM ?? 0,
              },
            ].map((item, idx) => (
              <View
                key={idx}
                style={tw`flex-row items-center justify-between gap-x-2`}
              >
                <Heading size="sm">{item.title}</Heading>
                <Heading size="sm">{item.number}</Heading>
              </View>
            ))}
          </View>
          <View style={tw`gap-y-4`}>
            <Heading type="medium" size="xl">
              Analytic Graph
            </Heading>
            <Heading size="sm">Event Attended (last 8 Months)</Heading>
            <View style={tw`-ml-2 mt-4`}>
              <BarChart
                data={chartData}
                noOfSections={5}
                barWidth={(width - 220) / dataLength}
                adjustToWidth
                parentWidth={width - 40}
                focusBarOnPress
                xAxisLabelTextStyle={tw`text-10px`}
                frontColor={COLORS.brand}
                yAxisTextStyle={tw`text-10px`}
                isAnimated
                xAxisLabelTexts={xAxisLabels}
              />
              <View
                style={tw`flex-row items-center gap-x-2 justify-center mt-2`}
              >
                <View style={tw`h-2 w-2 bg-brand`} />
                <Text style={tw`text-xs text-secondary`}>
                  {chartYearDisplay}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`gap-y-6`}>
            <Heading type="medium" size="base">
              Leaderboard — Your Current Rank
            </Heading>
            {leaderboard?.map((item, idx) => (
              <View key={idx} style={tw`gap-x-4 flex-row items-center`}>
                <Heading size="base" type="medium">
                  {item.rank +
                    (idx === 0
                      ? 'st'
                      : idx === 1
                      ? 'nd'
                      : idx === 2
                      ? 'rd'
                      : 'th')}
                </Heading>
                <UserCard data={{ ...item, secondaryImage: undefined }} />
              </View>
            ))}
          </View>
        </>
      )}
    </ScreenTemplate>
  );
};

export default Analytics;
