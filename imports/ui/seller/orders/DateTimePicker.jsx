// import React, { Component } from 'react';
// import Picker from 'rc-calendar/lib/Picker';
// import RangeCalendar from 'rc-calendar/lib/RangeCalendar';

// class DateTimePicker extends Component {
//     state = { 
//         value: [],
//         hoverValue: [],
//     }
//     render() { 
//         const { value, hoverValue } = this.state;

//         const calendar = (
//             <RangeCalendar 
//                 hoverValue={hoverValue}
//                 onHoverChange={this.onHoverChange}
//                 showWeekNumber={false}
//                 dateInputPlaceholder={['start', 'end']}
//                 defaultValue={[now, now.clone().add(1, 'months')]}
//                 locale={vn ? zhCN : enUS}
//                 disabledTime={disabledTime}
//                 timePicker={timePickerElement}
//             />
//         );

//         return ( 
//             <Picker value={value} onChange={this.onChange} animation="slide-up" calendar={calendar}>

//             </Picker>
//         );
//     }
// }
 
// export default DateTimePicker;