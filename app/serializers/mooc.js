import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    switch(requestType) {
      case 'findAll':
        return this.normalizeFindAllResponse(...arguments);
      case 'findRecord':
        return this.normalizeFindRecordResponse(...arguments);
    }
  },

  normalizeFindAllResponse(store, klass, payload = []) {
    return {
      data: payload.map(mooc => {
        return {
          type: 'mooc',
          id: mooc.slug,
          attributes: Object
                        .keys(mooc)
                        .reduce((attrs, key) => {
                          attrs[key.camelize()] = mooc[key];
                          return attrs;
                        }, {})
        };
      })
    };
  },

  normalizeFindRecordResponse(store, klass, payload, id) {
    let { elements } = payload;
    delete payload.elements;

    let data = {
      id,
      type: 'mooc',
      attributes: payload,
      relationships: {
        weeks: {data: []}
      }
    };
    let weeks = [];
    let chapters = [];

    elements.forEach(element => {
      if (element.type === 'chapter') {
        weeks.push({
          type: 'week',
          id: element.slug,
          attributes: element,
          relationships: {
            chapters: {data: []}
          }
        });
      } else {
        let currentWeek = weeks[weeks.length - 1];
        currentWeek.relationships.chapters.data.push({type: 'chapter', id: element.slug});
        chapters.push({
          type: 'chapter',
          id: element.slug,
          attributes: element
        });
      }
    });

    weeks.forEach(week => {
      data.relationships.weeks.data.push({type: 'week', id: week.id});
    });

    return {
      data,
      included: weeks.concat(chapters)
    };
  }
});
