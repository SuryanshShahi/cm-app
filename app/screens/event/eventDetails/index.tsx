import React from 'react';
import { Linking, Share, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import Config from '../../../../assets/Config';
import { Button, CardWrapper, Heading, Img } from '../../../shared';
import ScreenTemplate from '../../../shared/ScreenTemplate';
import { Octicons } from '../../../utils/Icons';
import tw from '../../../utils/tailwind';
import useHook from './useHook';
import { convertDate, convertTime } from '../../../utils/constants';
import moment from 'moment';

const EventDetails = () => {
  const { eventDetail } = useHook();
  return (
    <ScreenTemplate
      className="p-0"
      parentClassName="bg-white"
      bottomBar={
        <View style={tw`flex-row gap-x-4`}>
          <Button
            btnName="Add to Calendar"
            className="w-full flex-1"
            icon={
              <Feather name="plus-circle" size={18} style={tw`text-white`} />
            }
            action={() => {
              Linking.openURL(
                `https://www.google.com/calendar/event?action=TEMPLATE&text=${
                  eventDetail?.title
                }&dates=${eventDetail?.scheduledStartTime}/${moment(
                  eventDetail?.scheduledEndTime,
                )
                  .add({ days: 2 })
                  .toISOString()}&location=${eventDetail?.location}`,
              );
            }}
          />
          <Button
            btnName="Share Events"
            className="w-full flex-1"
            icon={<Feather name="share-2" size={18} style={tw`text-white`} />}
            action={() => {
              Share.share({
                message: `${eventDetail?.title}\n\n${
                  eventDetail?.description
                }\n\nDate - ${convertDate(
                  eventDetail?.scheduledStartTime,
                )}\nTime - ${convertTime(
                  eventDetail?.scheduledStartTime,
                )} - ${convertTime(
                  eventDetail?.scheduledEndTime,
                )}\nLocation - ${eventDetail?.location}`,
                url: `https://www.google.com/maps/search/?api=1&query=${eventDetail?.location}`,
              });
            }}
          />
        </View>
      }
    >
      <View>
        <Img source={Config.banner} className="h-200px w-full" />
        <View style={tw`absolute w-full bg-black/50 h-full justify-end p-5`}>
          <Heading
            size="2xl"
            type="semibold"
            color="white"
            className="text-center my-auto"
            numberOfLines={2}
          >
            {eventDetail?.title}
          </Heading>
          <Heading
            className="p-3 rounded-lg border border-white/50 backdrop-blur-lg text-center bg-neutral-50/10"
            color="white"
            type="semibold"
          >
            Event in Uttarakhand on{' '}
            {convertDate(eventDetail?.scheduledStartTime)}
          </Heading>
        </View>
      </View>
      <View style={tw`p-5 gap-y-4`}>
        <CardWrapper className="bg-orange-primary">
          {[
            {
              label: 'Date',
              value: convertDate(eventDetail?.scheduledStartTime),
              icon: <Feather name="calendar" size={20} />,
            },
            {
              label: 'Time',
              value: `${convertTime(
                eventDetail?.scheduledStartTime,
              )} - ${convertTime(eventDetail?.scheduledEndTime)}`,
              icon: <Feather name="clock" size={20} />,
            },
            {
              label: 'Location',
              value: eventDetail?.location,
              icon: <Octicons name="location" size={20} />,
            },
          ].map((item, idx) => (
            <View style={tw`flex-row gap-x-2`} key={idx}>
              <View style={tw`w-5`}>{item.icon}</View>
              <View style={tw`gap-y-2`}>
                <Heading size="xs" color="secondary">
                  {item.label}
                </Heading>
                <Heading>{item.value}</Heading>
              </View>
            </View>
          ))}
        </CardWrapper>
        <View style={tw`gap-y-2`}>
          <Heading size="lg" type="medium">
            About this event
          </Heading>
          <Heading>{eventDetail?.description}</Heading>
        </View>
        <View style={tw`gap-y-2`}>
          <Heading size="lg" type="medium">
            Location & Direction
          </Heading>
          <View
            style={tw`h-150px rounded-lg overflow-hidden border border-gray-300`}
          >
            <WebView
              source={{
                html: `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                      <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body, html { width: 100%; height: 100%; overflow: hidden; }
                        #map { width: 100%; height: 100%; }
                      </style>
                    </head>
                    <body>
                      <div id="map"></div>
                      <script>
                        var map = L.map('map').setView([30.0668, 79.0193], 10);
                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                          attribution: '© OpenStreetMap contributors',
                          maxZoom: 19
                        }).addTo(map);
                        var marker = L.marker([30.0668, 79.0193]).addTo(map);
                        marker.bindPopup('${(
                          eventDetail?.location || 'Event Location'
                        ).replace(/'/g, "\\'")}').openPopup();
                      </script>
                    </body>
                  </html>
                `,
              }}
              style={tw`w-full h-full`}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default EventDetails;
