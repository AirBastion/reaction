import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";
import TagsCustomer from "./tagsCustomer";

class ProductTags extends Component {
  get tags() {
    return this.props.tags;
  }

  get showEditControls() {
    return this.props.product && this.props.editable;
  }

  renderEditButton() {
    if (this.showEditControls) {
      return (
        <span className="edit-button">
          <Components.EditContainer
            data={this.props.product}
            disabled={this.props.editable === false}
            editView="ProductAdmin"
            field="hashtags"
            i18nKeyLabel="productDetailEdit.productSettings"
            label="Product Settings"
            permissions={["createProduct"]}
          />
        </span>
      );
    }

    return null;
  }

  render() {
    const { viewAs } = this.props;

    if (Array.isArray(this.tags) && this.tags.length > 0) {
      const headerClassName = classnames({
        "tags-header": true,
        "edit": this.showEditControls
      });

      if (viewAs === "customer") {
        return (
          <div className="pdp product-tags">
            <h3 className={headerClassName}>
              <Components.Translation defaultValue="Tags" i18nKey="productDetail.tags" />
            </h3>
            <TagsCustomer tags={this.tags} />
          </div>
        );
      }

      return (
        <div className="pdp product-tags">
          <h3 className={headerClassName}>
            <Components.Translation defaultValue="Tags" i18nKey="productDetail.tags" />
            {this.renderEditButton()}
          </h3>
          <Components.TagList
            editable={false}
            product={this.props.product}
            tags={this.tags}
          />
        </div>
      );
    }
    return null;
  }
}

ProductTags.propTypes = {
  editButton: PropTypes.node,
  editable: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  product: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.object),
  viewAs: PropTypes.string
};

registerComponent("ProductTags", ProductTags);

export default ProductTags;
