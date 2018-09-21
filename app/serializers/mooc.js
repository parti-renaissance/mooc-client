import DS from 'ember-data';

export default DS.Serializer.extend({
  normalizeAttributes(attributes) {
    return Object.keys(attributes).reduce((attrs, key) => {
      attrs[key.camelize()] = attributes[key];
      return attrs;
    }, {});
  },

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
          attributes: this.normalizeAttributes(mooc),
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
      attributes: this.normalizeAttributes(payload),
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
          attributes: this.normalizeAttributes(element),
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
          attributes: this.normalizeAttributes(element),
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
